import { authApi, securityApi } from '../../api/api';
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_PHOTOS = 'samurai-network/auth/SET_USER_PHOTOS';
const SET_LOGIN_DATA = 'samurai-network/auth/SET_LOGIN_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initState = {
    userId: null,
    email: null,
    password: null,
    login: null,
    isAuth: false,
    photos: null,
    captchaUrl: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case SET_USER_PHOTOS:
            return {
                ...state,
                photos: action.photos,
            };

        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            };

        default:
            return state;
    }
};

export const setAuthtUserData = (email, login, userId, isAuth) => ({
    type: SET_USER_DATA,
    payload: { email, login, userId, isAuth },
});

export const setAuthtUserPhotos = (photos) => ({
    type: SET_USER_PHOTOS,
    photos,
});

export const setLoginData = (userId) => ({
    type: SET_LOGIN_DATA,
    data: { userId },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl},
});

export const getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authApi.me();

        if (response.data.resultCode === 0) {
            let { email, login, id } = response.data.data;
            dispatch(setAuthtUserData(email, login, id, true));
        }
    };
};

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    };
};

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const response = await securityApi.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    };
};

export const logout = () => {
    return async (dispatch) => {
        let response = await authApi.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthtUserData(null, null, null, false));
        }
    };
};

export default authReducer;
