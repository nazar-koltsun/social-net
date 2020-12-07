import { authApi } from '../../api/api';
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_PHOTOS = 'samurai-network/auth/SET_USER_PHOTOS';
const SET_LOGIN_DATA = 'samurai-network/auth/SET_LOGIN_DATA';

let initState = {
    userId: null,
    email: null,
    password: null,
    login: null,
    isAuth: false,
    photos: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
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

export const getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authApi.me();

        if (response.data.resultCode === 0) {
            let { email, login, id } = response.data.data;
            dispatch(setAuthtUserData(email, login, id, true));
        }
    };
};

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await authApi.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
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
