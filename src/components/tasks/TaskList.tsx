import React, { Fragment, FunctionComponent, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { AlertContext } from '../../context/alert/AlertContext';
import { ProjectContext } from '../../context/project/ProjectContext';
import { ProjectActions } from '../../context/project/ProjectReducer';
import { TaskContext } from '../../context/task/TaskContext';
import { TaskActions } from '../../context/task/TaskReducer';

import Task from './Task';

import { deleteProject } from '../../utils/project.utils';

const TaskList: FunctionComponent = () => {
    const { projectState: { selectedProject }, projectDispatch } = useContext(ProjectContext);
    const { taskState: { projectTasks }, taskDispatch } = useContext(TaskContext);
    const { setAlertFn } = useContext(AlertContext);

    const handleDelete = async () => {
        projectDispatch({
            type: ProjectActions.DeleteProject,
            payload: selectedProject.id
        });
        const alert = await deleteProject(selectedProject.id);
        setAlertFn(alert);
        if (alert.category === 'error') return;

        taskDispatch({
            type: TaskActions.DeleteProjectTasks,
            payload: selectedProject.id
        });
    }

    return (
        Object.keys(selectedProject).length ?
            <Fragment>
                <h2>Proyecto: { selectedProject.name }</h2>
                <ul data-cy="task-list" className="task-list">
                    {
                        projectTasks.length ?
                            <TransitionGroup>
                                { 
                                    projectTasks.map(task =>
                                        <CSSTransition key={ task.id } timeout={ 200 } classNames="task">
                                            <Task task={ task }/>
                                        </CSSTransition>
                                    )
                                }
                            </TransitionGroup>
                            : <li className="task"><p>No hay tareas</p></li>
                    }
                </ul>
                <button type="button" className="btn btn-delete" onClick={ handleDelete }>Eliminar proyecto &times;</button>
            </Fragment>
            : <h2 data-cy="task-list-title">Selecciona un proyecto</h2>
    );
};

export default TaskList;