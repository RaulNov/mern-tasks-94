import React, { FunctionComponent, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ProjectContext } from '../../context/project/ProjectContext';

import Project from './Project';

const ProjectList: FunctionComponent = () => {
    const { projectState: { projects } } = useContext(ProjectContext);

    return (
        projects.length ?
            <ul data-cy="project-list" className="project-list">
                <TransitionGroup>
                    {
                        projects.map(project =>
                            <CSSTransition key={ project.id } timeout={ 200 } classNames="project">
                                <Project project={ project }/>
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>
            </ul>
            : <p>No hay proyectos, comienza creando uno</p>
    );
};

export default ProjectList;