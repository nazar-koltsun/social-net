import { usersApi } from "../../api/api";
import { profileApi } from "../../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_INFFO = "SET_USER_INFFO";
const SET_STATUS = "SET_STATUS";

let initialState = {
    userInfo: null,
    postsData: [
        { id: 1, message: "Hi, how are you", like: "10" },
        { id: 2, message: "It's me first post", like: "15" },
    ],

    status: "",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                like: 0,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }
        case SET_USER_INFFO: {
            return {
                ...state,
                userInfo: action.userInfo,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText});

export const setUserInfo = (userInfo) => ({ type: SET_USER_INFFO, userInfo });
export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => (dispatch) => {
    return usersApi.getProfile(userId).then((response) => {
      dispatch(setUserInfo(response.data));
    });
};

export const getUserStatus = (userId) => (dispatch) => {
    return profileApi.getStatus(userId).then((response) => {
        dispatch(setStatus(response.data));
    });
};

export const updateUserStatus = (status) => (dispatch) => {
    return profileApi.updateStatus(status).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    });
};



export default profileReducer;
