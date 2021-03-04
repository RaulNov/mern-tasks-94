import React, { ChangeEvent, FormEvent, FunctionComponent, useContext, useEffect, useState } from 'react';

import { AlertContext } from '../../context/alert/AlertContext';
import { ProjectContext } from '../../context/project/ProjectContext';
import { TaskContext } from '../../context/task/TaskContext';
import { TaskActions } from '../../context/task/TaskReducer';

import { editTask, createTask } from '../../utils/task.utils';

const TaskForm: FunctionComponent = () => {
    const { projectState: { selectedProject } } = useContext(ProjectContext);
    const { taskState: { invalidTaskName, selectedTask }, taskDispatch } = useContext(TaskContext);
    const { setAlertFn } = useContext(AlertContext);

    const [taskName, setTaskName] = useState<string>('');

    useEffect(() => {
        if (Object.keys(selectedTask).length) {
            setTaskName(selectedTask.name);
            return;
        }
        setTaskName('');
    }, [selectedTask]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!taskName.trim()) {
            taskDispatch({
                type: TaskActions.SetInvalidName,
                payload: true
            });
            return;
        }

        if (Object.keys(selectedTask).length) {
            const { alert, task } = await editTask(selectedTask.id, { name: taskName });
            setAlertFn(alert);
            if (!task) return;

            taskDispatch({
                type: TaskActions.EditTask,
                payload: task
            });
        } else {
            const { alert, task } = await createTask(selectedProject.id, taskName);
            setAlertFn(alert);
            if (!task) return;

            taskDispatch({
                type: TaskActions.AddTask,
                payload: task
            });
        }

        setTaskName('');
    };

    return (
        Object.keys(selectedProject).length ?
        <div className="form">
            <form onSubmit={ handleSubmit }>
                <div className="input-container">
                    <input
                        data-cy="task-name-input"
                        type="text"
                        value={ taskName }
                        className="input-text"
                        placeholder="Nombre de la tarea..."
                        onChange={ (e: ChangeEvent<HTMLInputElement>): void => setTaskName(e.target.value) }
                    />
                </div>
                <div className="input-container">
                    <input
                        data-cy="new-task-submit"
                        type="submit"
                        value={ Object.keys(selectedTask).length ? 'Editar tarea' : 'Crear tarea' }
                        className="btn btn-primary btn-submit btn-block"
                        onSubmit={ handleSubmit }
                    />
                </div>
            </form>
            {
                invalidTaskName ?
                <p data-cy="task-alert" className="message error">El nombre de la tarea es obligatorio</p>
                : null
            }
        </div>
        : null
    );
};

export default TaskForm;