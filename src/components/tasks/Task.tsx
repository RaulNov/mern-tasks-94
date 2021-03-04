import React, { FunctionComponent, useContext } from 'react';

import { AlertContext } from '../../context/alert/AlertContext';
import { TaskContext } from '../../context/task/TaskContext';
import { TaskActions } from '../../context/task/TaskReducer';

import { deleteTask, editTask } from '../../utils/task.utils';

import { TaskType } from '../../utils/types';

const Task: FunctionComponent<{ task: TaskType }> = ({ task }) => {
    const { taskDispatch } = useContext(TaskContext);
    const { setAlertFn } = useContext(AlertContext);

    const { id, name, finished } = task;

    const handleDelete = async () => {
        const alert = await deleteTask(id);
        setAlertFn(alert);
        if (alert.category !== 'success') return;

        taskDispatch({
            type: TaskActions.DeleteTask,
            payload: id
        });
    };

    const changeTaskStatus = async () => {
        const { alert, task } = await editTask(id, { finished: !finished });
        setAlertFn(alert);
        if (!task) return;

        taskDispatch({
            type: TaskActions.EditTask,
            payload: task
        });
    };

    return (
        <li className="task shadow">
            <p data-cy="task-name">{ name }</p>
            <div className="status">
                {
                    finished ?
                        <button data-cy="decomplete-task-btn" type="button" className="completed" onClick={ changeTaskStatus }>Completa</button>
                        : <button data-cy="complete-task-btn" type="button" className="incompleted" onClick={ changeTaskStatus }>Incompleta</button>
                }
            </div>
            <div className="actions">
                <button data-cy="edit-task-btn" type="button" className="btn btn-primary" onClick={ (): void => taskDispatch({
                    type: TaskActions.SetSelectedTask,
                    payload: task
                }) }>Editar</button>
                <button data-cy="delete-task-btn" type="button" className="btn btn-secondary" onClick={ handleDelete }>Eliminar</button>
            </div>
        </li>
    );
};

export default Task;