import { usersApi } from '../../api/users-api';
import { UserType } from '../../types/types';
import { updateObjectInArray } from '../../utils/object-helper';
import { BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { InferActionsTypes } from './redux-store';
import { APIResponseType } from '../../api/api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case 'SN/USERS/SET_USERS': {
            return {
                ...state,
                users: [...action.users],
            };
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }
        case 'SN/USERS/SET_FILTER': {
            return {
                ...state,
                filter: action.payload,
            };
        }
        case 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };
        }
        default:
            return state;
    }
};

export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USERS/SET_CURRENT_PAGE',
        currentPage,
    } as const),
    setFilter: (filter: FilterType) => ({
        type: 'SN/USERS/SET_FILTER',
        payload: filter,
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        totalUsersCount,
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching,
    } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS',
        isFetching,
        userId
    } as const)
}

export const requestUsers = (page: number, totalUsersCount: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));
      
        const data = await usersApi.getUsers(page, totalUsersCount, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMethod: (userID: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionTypes) => {
        dispatch(actions.toggleFollowingInProgress(true, userId));
        const response = await apiMethod(userId);

        if (response.resultCode === 0) {
            dispatch(actionCreator(userId));
        }

        dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccess);
    };
};

export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.unFollow.bind(usersApi), actions.unfollowSuccess);
    };
};

export default usersReducer;

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;
