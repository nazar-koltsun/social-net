import { usersApi } from '../../api/api';
import { UserType } from '../../types/types';
import { updateObjectInArray } from '../../utils/object-helper';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes } from './redux-store';
// import actions from 'redux-form/lib/actions';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ids
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users],
            };
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

        case 'TOGGLE_FOLLOWING_IN_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id != action.userId
                      ),
            };
        }

        default:
            return state;
    }
};

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage,
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount,
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching,
    } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_FOLLOWING_IN_PROGRESS',
        isFetching,
        userId
    } as const)
}

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>

export const requestUsers = (page: number, totalUsersCount: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        const data = await usersApi.getUsers(page, totalUsersCount);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
        dispatch(actions.toggleFollowingInProgress(true, userId));
        const response = await apiMethod(userId);

        if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.followSuccess);
    };
};

export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersApi.unFollow.bind(usersApi), actions.unfollowSuccess);
    };
};

export default usersReducer;
