import { AuthState } from './AuthContext';

import { ActionMap, UserDecodedType } from '../../utils/types';

export enum AuthActions {
    SuccessfullAuth = 'SUCCESSFULL_AUTH',
    FailedAuth = 'FAILED_AUTH',
    Logout = 'LOGOUT'
}

type AuthPayload = {
    [AuthActions.SuccessfullAuth]: {
        token?: string,
        user: UserDecodedType
    },
    [AuthActions.FailedAuth]: undefined,
    [AuthActions.Logout]: undefined
};

export type AuthActionTypes = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const AuthReducer = (state: AuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case AuthActions.SuccessfullAuth: 
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loadingAuth: false
            };
        case AuthActions.FailedAuth:
            return {
                ...state,
                token: '',
                user: null,
                isAuthenticated: false,
                loadingAuth: false
            };
        case AuthActions.Logout: 
            return {
                ...state,
                token: '',
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default AuthReducer;