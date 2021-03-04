import jwtDecode from 'jwt-decode';

import httpClient, { setAuthToken } from './httpClient';

import { AlertType, UserDecodedType } from './types';

export interface AuthObject {
    token?: string;
    userDecoded?: UserDecodedType;
    alert?: AlertType;
};

export const login = async (email: string, password: string): Promise<AuthObject> => {
    try {
        const response = await httpClient.post('/api/auth', { email, password });
        const { data: { ok, token } } = response;
        if (!ok) throw new Error('Error en la autenticación del usuario');
        localStorage.setItem('token', token);
        setAuthToken(token);
        
        const decoded = jwtDecode(token) as { user: UserDecodedType };

        return {
            token,
            userDecoded: decoded.user
        };
    } catch (error) {
        const message: string = error.response ? `${error.response.data.errors[0].msg}` : error.message;
        return {
            token: '',
            alert: {
                message,
                category: 'error'
            }
        };
    }
};

export const authenticateUser = async (): Promise<AuthObject> => {
    try {
        const response = await httpClient.get('/api/auth');
        const { data: { ok } } = response;
        if (!ok) throw new Error('Error en la autenticación');

        const decoded = jwtDecode(`${localStorage.getItem('token')}`) as { user: UserDecodedType };

        return {
            userDecoded: decoded.user
        };
    } catch (error) {
        console.log(error);
        return {};
    }
};