import { ProjectState } from './ProjectContext';

import { ActionMap, ProjectType } from '../../utils/types';

export enum ProjectActions {
    SetForm = 'SET_FORM',
    SetProjects = 'GET_PROJECTS',
    CreateProject = 'CREATE_PROJECT',
    SetInvalidName = 'SET_VALID_NAME',
    SetSelectedProject = 'SET_SELECTED_PROJECT',
    DeleteProject = 'DELETE_PROJECT'
}

type ProjectPayload = {
    [ProjectActions.SetForm]: boolean,
    [ProjectActions.SetProjects]: ProjectType[],
    [ProjectActions.CreateProject]: ProjectType,
    [ProjectActions.SetInvalidName]: boolean,
    [ProjectActions.SetSelectedProject]: string,
    [ProjectActions.DeleteProject]: string
};

export type ProjectActionTypes = ActionMap<ProjectPayload>[keyof ActionMap<ProjectPayload>];

export const ProjectReducer = (state: ProjectState, action: ProjectActionTypes): ProjectState => {
    switch (action.type) {
        case ProjectActions.SetForm:
            return {
                ...state,
                creatingProject: action.payload
            }
        case ProjectActions.SetProjects:
            return {
                ...state,
                projects: [...action.payload]
            };
        case ProjectActions.CreateProject:
            return {
                ...state,
                creatingProject: false,
                invalidProjectName: false,
                projects: [...state.projects, action.payload]
            }
        case ProjectActions.SetInvalidName:
            return {
                ...state,
                invalidProjectName: action.payload
            }
        case ProjectActions.SetSelectedProject:
            return {
                ...state,
                selectedProject: state.projects.filter(project => project.id === action.payload)[0]
            }
        case ProjectActions.DeleteProject:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                selectedProject: {} as ProjectType
            };
        default:
            return state;
    }
};