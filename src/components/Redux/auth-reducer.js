import { authApi } from "../../api/api";
import { loginApi } from "../../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_USER_PHOTOS = "SET_USER_PHOTOS";
const SET_LOGIN_DATA = "SET_LOGIN_DATA";

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
                ...action.data,
                isAuth: true,
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

export const setAuthtUserData = (email, login, userId) => ({
    type: SET_USER_DATA,
    data: { email, login, userId },
});

export const setAuthtUserPhotos = (photos) => ({
    type: SET_USER_PHOTOS,
    photos,
});

export const setLoginData = (userId) => ({
    type: SET_LOGIN_DATA,
    data: {userId},
});

export const getAuthUserData = () => {
    return (dispatch) => {
        authApi.me().then((response) => {
            if (response.data.resultCode === 0) {
                let { email, login, id } = response.data.data;

                dispatch(setAuthtUserData(email, login, id));
            }
        });
    };
};

export const getLoginUserData = (email, password) => {
    return (dispatch) => {
        loginApi.validUserData(email, password).then((response) => {
            if (response.data.resultCode === 0) {
                response.data.email = email;
                response.data.password = password;
    
                let userId = response.data.data;
                dispatch(setLoginData(userId, email));
                console.log(response.data);
            }
        });
    };
};

export default authReducer;
