import { usersApi } from '../../api/api';
import { UserType } from '../../types/types';
import { updateObjectInArray } from '../../utils/object-helper';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

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
        case FOLLOW:
            return {
                ...state,
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: true };
                //     }
                //     return user;
                // }),
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                // users: state.users.map((user) => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: false };
                //     }
                //     return user;
                // }),
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users],
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            };
        }

        case TOGGLE_FOLLOWING_IN_PROGRESS: {
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

type ActionTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleFollowingInProgressType;

type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });

type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({ type: UNFOLLOW, userId });

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users });


type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});

type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const requestUsers = (page: number, totalUsersCount: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        const data = await usersApi.getUsers(page, totalUsersCount);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleIsFetching(false));
    };
};

type DispatchType = Dispatch<ActionTypes>
type FollowFlowActionCreatorType = (userId: number) => FollowSuccessType | UnfollowSuccessType
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: FollowFlowActionCreatorType) => {
        dispatch(toggleFollowingInProgress(true, userId));
        const response = await apiMethod(userId);

        if (response.data.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), followSuccess);
    };
};

export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersApi.unFollow.bind(usersApi), unfollowSuccess);
    };
};

export default usersReducer;
