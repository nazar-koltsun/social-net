import { ResultCodeEnum } from '../../api/api';
import { authApi, ResultCodeForCaptcha } from '../../api/auth-api';
import { securityApi } from '../../api/security-api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initState = {
    userId: null as number | null,
    email: null as string | null,
    password: null as string | null,
    login: null as string | null,
    isAuth: false,
    photos: null,
    captchaUrl: null as string | null,
}


const authReducer = (
    state = initState,
    action: ActionsType
): initialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                userId: 'sflsdjfsd',
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const actions = {
    setAuthtUserData: (
        email: string | null,
        login: string | null,
        userId: number | null,
        isAuth: boolean
    ) => ({
        type: 'SN/auth/SET_USER_DATA',
        payload: { email, login, userId, isAuth },
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: { captchaUrl },
    } as const),
}


export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authApi.me()

    if (meData.resultCode === ResultCodeEnum.Success) {
        let { email, login, id } = meData.data;
        dispatch(actions.setAuthtUserData(email, login, id, true))
    }
}

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
):ThunkType => async (dispatch) => {
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

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};


export const logout = ():ThunkType => async (dispatch) => {
    let response = await authApi.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthtUserData(null, null, null, false));
    }
}

export default authReducer

export type initialStateType = typeof initState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>;