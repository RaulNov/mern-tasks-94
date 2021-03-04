import React, { FunctionComponent, useContext, useEffect, useState } from 'react';

import { AlertContext } from '../../context/alert/AlertContext';
import { ProjectContext } from '../../context/project/ProjectContext';
import { ProjectActions } from '../../context/project/ProjectReducer';

import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import Alert from '../UI/Alert';

import { getProjects } from '../../utils/project.utils';

const Projects: FunctionComponent = () => {
    const { projectDispatch } = useContext(ProjectContext);
    const { alertState: { alert } } = useContext(AlertContext);
    const [projectsLoaded, setProjectsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!projectsLoaded) {
            const loadProjects = async () => {
                const projects = await getProjects();

                projectDispatch({
                    type: ProjectActions.SetProjects,
                    payload: projects
                });
            };
            loadProjects();
            setProjectsLoaded(true);
        }
    }, [projectsLoaded, projectDispatch])

    return (
        <div className="app-container">
            <Sidebar/>
            <div className="main-section">
                { alert && <Alert alert={ alert } /> }
                <TopBar/>
                <main>
                    <TaskForm/>
                    <div className="task-container">
                        <TaskList/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;