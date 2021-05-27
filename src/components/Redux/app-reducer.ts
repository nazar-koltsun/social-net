import {getAuthUserData} from './auth-reducer'
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type initialStateType = {
    initialized: boolean,
};

let initState : initialStateType  = {
    initialized: false
};

const appReducer = (state : initialStateType = initState, action: ActionTypes) : initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
};

type ActionTypes = initializedSuccessActionType

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = () : initializedSuccessActionType => ({
        type: INITIALIZED_SUCCESS
    }
);

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(initializedSuccess())
    });
};

export default appReducer
