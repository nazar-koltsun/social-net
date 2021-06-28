import { authApi, securityApi, ResultCodeEnum, ResultCodeForCaptcha } from '../../api/api';
import { stopSubmit } from 'redux-form';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'
const SET_USER_PHOTOS = 'samurai-network/auth/SET_USER_PHOTOS'
const SET_LOGIN_DATA = 'samurai-network/auth/SET_LOGIN_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

let initState = {
    userId: null as number | null,
    email: null as string | null,
    password: null as string | null,
    login: null as string | null,
    isAuth: false,
    photos: null,
    captchaUrl: null as string | null,
}

export type initialStateType = typeof initState

const authReducer = (
    state = initState,
    action: ActionTypes
): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                userId: 'sflsdjfsd',
                ...state,
                ...action.payload,
            }
        case SET_USER_PHOTOS:
            return {
                ...state,
                photos: action.photos,
            }

        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            };

        default:
            return state
    }
}

type ActionTypes =
    | SetAuthtUserDataType
    | SetAuthtUserPhotosType
    | SetdataType
    | GetCaptchaUrlSuccessType;

type SetAuthtUserDataPayloadType = {
    email: string | null
    login: string | null
    userId: number | null
    isAuth: boolean
}

type SetAuthtUserDataType = {
    type: typeof SET_USER_DATA
    payload: SetAuthtUserDataPayloadType
}

export const setAuthtUserData = (
    email: string | null,
    login: string | null,
    userId: number | null,
    isAuth: boolean
): SetAuthtUserDataType => ({
    type: SET_USER_DATA,
    payload: { email, login, userId, isAuth },
})

type SetAuthtUserPhotosType = {
    type: typeof SET_USER_PHOTOS
    photos: any
}

export const setAuthtUserPhotos = (photos: any): SetAuthtUserPhotosType => ({
    type: SET_USER_PHOTOS,
    photos,
})

type SetdataType = {
    type: typeof SET_LOGIN_DATA;
    data: { userId: number }
}

export const setdata = (userId: number): SetdataType => ({
    type: SET_LOGIN_DATA,
    data: { userId },
})

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (
    captchaUrl: string
): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authApi.me()

        if (meData.resultCode === ResultCodeEnum.Success) {
            let { email, login, id } = meData.data;
            dispatch(setAuthtUserData(email, login, id, true))
        }
    }
}

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
): ThunkType => {
    return async (dispatch: any) => {
        let data = await authApi.login(
            email,
            password,
            rememberMe,
            captcha
        )
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message =
                data.messages.length > 0
                    ? data.messages[0]
                    : 'Some error'
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const response = await securityApi.getCaptchaUrl();
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    };
};

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthtUserData(null, null, null, false))
        }
    }
}

export default authReducer
