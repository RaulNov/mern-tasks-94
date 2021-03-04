import httpClient from './httpClient';

import { AlertType } from './types';

export const createUser = async (username: string, email: string, password: string): Promise<AlertType> => {
    try {
        const response = await httpClient.post('/api/users', { username, email, password });
        if (!response.data.ok) throw new Error('Error al crear el usuario');
        return {
            message: `${response.data.msg}`,
            category: 'success'
        };
    } catch (error) {
        const message: string = error.response ? `${error.response.data.errors[0].msg}` : error.message;
        return {
            message,
            category: 'error'
        };
    }
};