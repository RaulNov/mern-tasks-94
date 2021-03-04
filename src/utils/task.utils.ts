import httpClient from './httpClient';

import { AlertType, TaskType } from './types';

export const getProjectTasks = async (projectId: string): Promise<TaskType[]> => {
    try {
        const { data: { ok, tasks } } = await httpClient.get(`/api/tasks/project/${projectId}`);
        if (!ok) throw new Error('Error al obtener las tareas');
        return [...tasks];
    } catch (error) {
        return [];
    }
};

export const createTask = async (project: string, name: string): Promise<{ alert: AlertType, task?: TaskType }> => {
    try {
        const { data: { ok, msg: message, task } } = await httpClient.post('/api/tasks', { project, name });
        if (!ok) throw new Error('Error al crear la tarea');
        return {
            alert: {
                message,
                category: 'success'
            },
            task
        };
    } catch (error) {
        const message: string = error.response ? `${error.response.data.errors[0].msg}` : error.message;
        return {
            alert: {
                message,
                category: 'error'
            }
        };
    }
};

export const editTask = async (id: string, data: { name?: string, finished?: boolean }): Promise<{ alert: AlertType, task?: TaskType }> => {
    try {
        const { data: { ok, msg: message, task } } = await httpClient.put(`/api/tasks/${id}`, data);
        if (!ok) throw new Error('Error al editar la tarea');

        return {
            alert: {
                message,
                category: 'success'
            },
            task
        };
    } catch (error) {
        const message: string = error.response ? `${error.response.data.errors[0].msg}` : error.message;
        return {
            alert: {
                message,
                category: 'error'
            }
        };
    }
};

export const deleteTask = async (id: string): Promise<AlertType> => {
    try {
        const { data: { ok, msg: message } } = await httpClient.delete(`/api/tasks/${id}`)
        if (!ok) throw new Error('Error al eliminar la tarea');

        return {
            message,
            category: 'success'
        };
    } catch (error) {
        const message: string = error.response ? `${error.response.data.errors[0].msg}` : error.message;
        return {
            message,
            category: 'error'
        };
    }
}