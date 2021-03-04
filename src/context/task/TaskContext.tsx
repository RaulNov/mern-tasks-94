import React, { createContext, Dispatch, FunctionComponent, useReducer } from 'react';

import { TaskReducer, TaskActionTypes } from './TaskReducer';

import { TaskType } from '../../utils/types';

export type TaskState = {
    projectTasks: TaskType[],
    invalidTaskName: boolean,
    selectedTask: TaskType
};

type TaskContextType = {
    taskState: TaskState,
    taskDispatch: Dispatch<TaskActionTypes>
};

const initialState: TaskState = {
    projectTasks: [],
    invalidTaskName: false,
    selectedTask: {} as TaskType
};

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: FunctionComponent = ({ children }) => {
    const [taskState, taskDispatch] = useReducer(TaskReducer, initialState);

    return (
        <TaskContext.Provider value={{ taskState, taskDispatch }}>
            { children }
        </TaskContext.Provider>
    );
};