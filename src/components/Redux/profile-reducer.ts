import { usersApi } from '../../api/api';
import { profileApi } from '../../api/api';
import { stopSubmit } from "redux-form";
import { PhotosType, PostsType, ContactsType, ProfileType } from '../../types/types';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'ADD-POST';
const SET_USER_INFFO = 'SET_USER_INFFO';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', like: 10 },
        { id: 2, message: "It's me first post", like: 15 },
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_INFFO: {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts].filter(post => post.id != action.id)
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;
    }
};

type ActionTypes = AddPostActionCreatorType | SetUserInfoType | SetStatusType | DeletePostType | SavePhotoSuccessType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string):AddPostActionCreatorType => ({
    type: ADD_POST,
    newPostText,
});

type SetUserInfoType = {
    type: typeof SET_USER_INFFO
    profile: ProfileType
}
export const setUserInfo = (profile: ProfileType): SetUserInfoType => ({ type: SET_USER_INFFO, profile });

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status });

type DeletePostType = {
    type: typeof DELETE_POST
    id: number
}
export const deletePost = (id: number): DeletePostType => ({ type: DELETE_POST, id });

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: any): SavePhotoSuccessType => ({ 
    type: SAVE_PHOTO_SUCCESS, 
    photos 
})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await usersApi.getProfile(userId)
    dispatch(setUserInfo(response.data))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch(error) {

    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let message = response.data.messages;
            dispatch(stopSubmit("edit-profile", {_error: message}))
            return Promise.reject(message)
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    const response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export default profileReducer
