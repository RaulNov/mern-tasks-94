import httpClient from './httpClient';

import { ProjectType, AlertType } from './types';

export const getProjects = async (): Promise<ProjectType[]> => {
    try {
        const { data: { ok, projects } } = await httpClient.get('/api/projects');
        if (!ok) throw new Error('Error al obtener los proyectos');
        return [...projects];
    } catch (error) {
        return [];
    }
};

export const createProject = async (name: string): Promise<{ alert: AlertType, project?: ProjectType }> => {
    try {
        const response = await httpClient.post('/api/projects', { name });
        const { data: { ok, project, msg: message } } = response;
        if (!ok) throw new Error('Error al crear el proyecto');

        return {
            alert: {
                message,
                category: 'success'
            },
            project
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

export const deleteProject = async (projectId: string): Promise<AlertType> => {
    try {
        const { data: { ok, msg: message } } = await httpClient.delete(`/api/projects/${projectId}`);
        if (!ok) throw new Error('Error al eliminar el proyecto');
        
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