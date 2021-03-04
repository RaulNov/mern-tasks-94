import React, { ChangeEvent, FormEvent, Fragment, FunctionComponent, useContext, useState } from 'react';
import { ProjectContext } from '../../context/project/ProjectContext';
import { ProjectActions } from '../../context/project/ProjectReducer';
import { AlertContext } from '../../context/alert/AlertContext';

import { createProject } from '../../utils/project.utils';

const NewProject: FunctionComponent = () => {
    const { setAlertFn } = useContext(AlertContext);

    const { projectState: { creatingProject, invalidProjectName }, projectDispatch } = useContext(ProjectContext);

    const [projectName, setProjectName] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setProjectName(e.target.value);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!projectName.trim()) {
            projectDispatch({
                type: ProjectActions.SetInvalidName,
                payload: true
            });
            return;
        }

        projectDispatch({
            type: ProjectActions.SetInvalidName,
            payload: false
        });

        const { alert, project } = await createProject(projectName);
        setAlertFn(alert);
        if (!project) return;

        projectDispatch({
            type: ProjectActions.CreateProject,
            payload: project
        });

        setProjectName('');
    };

    const showForm = (): void => {
        if (creatingProject) {
            setProjectName('');

            projectDispatch({
                type: ProjectActions.SetInvalidName,
                payload: false
            });
        }

        projectDispatch({
            type: ProjectActions.SetForm,
            payload: !creatingProject
        });
    };

    return (
        <Fragment>
            <button
                data-cy="new-project-btn"
                className="btn btn-primary btn-block"
                onClick={ showForm }>
                    { creatingProject ? 'Cancelar' : 'Nuevo proyecto' }
            </button>
            {
                creatingProject ?
                    <form className="new-project-form" onSubmit={ handleSubmit }>
                        <input
                            data-cy="project-name-imput"
                            type="text"
                            value={ projectName }
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            onChange={ handleChange }
                        />
                        <input data-cy="new-project-submit" type="submit" value="Agregar proyecto" className="btn btn-primary btn-block"/>
                    </form>
                    : null
            }
            {
                invalidProjectName ?
                    <p data-cy="project-alert" className="message error">El nombre del proyecto es obligatorio</p>
                    : null
            }
        </Fragment>
    );
};

export default NewProject;