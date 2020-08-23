import { authApi } from "../../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_USER_PHOTOS = "SET_USER_PHOTOS";

let initState = {
    userId: null,
    email: null,
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

        default:
            return state;
    }
};

export const setAuthtUsetData = (email, login, userId) => ({
    type: SET_USER_DATA,
    data: { email, login, userId },
});

export const setAuthtUserPhotos = (photos) => ({
    type: SET_USER_PHOTOS,
    photos,
});

export const getAuthUserData = () => {
    return (dispatch) => {
        authApi.me().then((response) => {
            if (response.data.resultCode === 0) {
                let { email, login, id } = response.data.data;

                dispatch(setAuthtUsetData(email, login, id));
            }
        });
    };
};

export default authReducer;
