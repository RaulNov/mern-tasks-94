import React, { createContext, Dispatch, FunctionComponent, useReducer } from 'react';

import { ProjectReducer, ProjectActionTypes } from './ProjectReducer';

import { ProjectType } from '../../utils/types';

export type ProjectState = {
    creatingProject: boolean,
    projects: ProjectType[],
    invalidProjectName: boolean,
    selectedProject: ProjectType
};

type ProjectContextType = {
    projectState: ProjectState,
    projectDispatch: Dispatch<ProjectActionTypes>
};

const initialState: ProjectState = {
    creatingProject: false,
    projects: [],
    invalidProjectName: false,
    selectedProject: {} as ProjectType
};

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export const ProjectProvider: FunctionComponent = ({ children }) => {
    const [projectState, projectDispatch] = useReducer(ProjectReducer, initialState);

    return (
        <ProjectContext.Provider value={{ projectState, projectDispatch }}>
            { children }
        </ProjectContext.Provider>
    );
};
