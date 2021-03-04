import { TaskState } from './TaskContext';

import { ActionMap, TaskType } from '../../utils/types';

export enum TaskActions {
    GetProjectTasks = 'GET_PROJECT_TASKS',
    AddTask = 'ADD_TASK',
    SetInvalidName = 'SET_INVALID_NAME',
    DeleteTask = 'DELETE_TASK',
    SetSelectedTask = 'SET_SELECTED_TASK',
    EditTask = 'EDIT_TASK',
    DeleteProjectTasks = 'DELETE_PROJECT_TASKS'
}

type TaskPayload = {
    [TaskActions.GetProjectTasks]: TaskType[]
    [TaskActions.AddTask]: TaskType,
    [TaskActions.SetInvalidName]: boolean,
    [TaskActions.DeleteTask]: string,
    [TaskActions.SetSelectedTask]: TaskType,
    [TaskActions.EditTask]: TaskType,
    [TaskActions.DeleteProjectTasks]: string
};

export type TaskActionTypes = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];

export const TaskReducer = (state: TaskState, action: TaskActionTypes): TaskState => {
    switch (action.type) {
        case TaskActions.GetProjectTasks:
            return {
                ...state,
                projectTasks: [...action.payload]
            };
        case TaskActions.AddTask: 
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                invalidTaskName: false
            };
        case TaskActions.SetInvalidName:
            return {
                ...state,
                invalidTaskName: action.payload
            };
        case TaskActions.DeleteTask:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(({ id }) => id !== action.payload)
            };
        case TaskActions.SetSelectedTask:
            return {
                ...state,
                selectedTask: action.payload
            };
        case TaskActions.EditTask:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task.id === action.payload.id ? action.payload : task),
                invalidTaskName: false,
                selectedTask: {} as TaskType
            };
        case TaskActions.DeleteProjectTasks:
            return {
                ...state,
                projectTasks: [],
                invalidTaskName: false,
                selectedTask: {} as TaskType
            };
        default:
            return state;
    }
};