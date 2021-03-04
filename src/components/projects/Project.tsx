import React, { FunctionComponent, useContext } from 'react';

import { ProjectContext } from '../../context/project/ProjectContext';
import { ProjectActions } from '../../context/project/ProjectReducer';
import { TaskContext } from '../../context/task/TaskContext';
import { TaskActions } from '../../context/task/TaskReducer';

import { getProjectTasks } from '../../utils/task.utils';
import { ProjectType, TaskType } from '../../utils/types';

const Project: FunctionComponent<{ project: ProjectType }> = ({ project: { id, name } }) => {
    const { projectDispatch } = useContext(ProjectContext);
    const { taskState: { invalidTaskName, selectedTask }, taskDispatch } = useContext(TaskContext);

    const selectProject = async () => {
        projectDispatch({
            type: ProjectActions.SetSelectedProject,
            payload: id
        });

        const tasks = await getProjectTasks(id);

        taskDispatch({
            type: TaskActions.GetProjectTasks,
            payload: tasks
        });

        if (invalidTaskName) taskDispatch({
            type: TaskActions.SetInvalidName,
            payload: false
        });

        if (Object.keys(selectedTask)) taskDispatch({
            type: TaskActions.SetSelectedTask,
            payload: {} as TaskType
        });
    };

    return (
        <li>
            <button className="btn btn-blank" onClick={ selectProject }>{ name }</button>
        </li>
    );
};

export default Project;