import {getAuthUserData} from './auth-reducer'
import { InferActionsTypes } from './redux-store';

let initState = {
    initialized: false
};

export type initialStateType = typeof initState;
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state : initialStateType = initState, action: ActionsType) : initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
};

const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const) 
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    });
};

export default appReducer
