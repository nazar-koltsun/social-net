import { ResultCodeEnum } from '../../api/api';
import { profileApi } from '../../api/profile-api';
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostsType, ContactsType, ProfileType } from '../../types/types';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', like: 10 },
        { id: 2, message: "It's me first post", like: 15 },
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: '',
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
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
        case 'SN/PROFILE/SET_USER_INFFO': {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status,
            };
        }

        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: [...state.posts].filter(post => post.id != action.id)
            }
        }

        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }

        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (newPostText: string) => ({
        type: 'SN/PROFILE/ADD-POST',
        newPostText,
    } as const),
    setUserInfo: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_INFFO', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const), 
    deletePost: (id: number) => ({ type: 'SN/PROFILE/DELETE_POST', id } as const),
    savePhotoSuccess: (photos: any) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getProfile(userId)
    dispatch(actions.setUserInfo(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileApi.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Error) {
            dispatch(actions.setStatus(status))
        }
    } catch(error) {

    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can\'t be null');
        }
    } else {
        let message = data.messages;
            dispatch(stopSubmit("edit-profile", {_error: message}))
            return Promise.reject(message)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileApi.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;