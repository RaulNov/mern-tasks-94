import React, { createContext, Dispatch, FunctionComponent, useCallback, useEffect, useReducer } from 'react';

import AuthReducer, { AuthActions, AuthActionTypes } from './AuthReducer';

import { authenticateUser } from '../../utils/auth.utils';
import { setAuthToken } from '../../utils/httpClient';

import { UserDecodedType } from '../../utils/types';

export type AuthState = {
    token: string,
    isAuthenticated: boolean,
    loadingAuth: boolean,
    user: UserDecodedType | null
}

type AuthContextType = {
    authState: AuthState,
    authDispatch: Dispatch<AuthActionTypes>,
    validateAuth(): Promise<void>
};

const initialState: AuthState = {
    token: `${localStorage.getItem('token')}`,
    isAuthenticated: false,
    loadingAuth: true,
    user: null
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [authState, authDispatch] = useReducer(AuthReducer, initialState);

    const validateAuth = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);
        else {
            authDispatch({
                type: AuthActions.FailedAuth
            });
            return;
        }

        const { userDecoded } = await authenticateUser();
        if (userDecoded) {
            authDispatch({
                type: AuthActions.SuccessfullAuth,
                payload: {
                    user: userDecoded
                }
            });
        } else {
            authDispatch({
                type: AuthActions.FailedAuth
            });
        }
    }, []);

    useEffect(() => {
        validateAuth();
    }, [validateAuth])

    return (
        <AuthContext.Provider value={{ authState, authDispatch, validateAuth }}>
            { children }
        </AuthContext.Provider>
    );
};