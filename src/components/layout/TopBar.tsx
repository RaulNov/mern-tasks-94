import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';
import { AuthActions } from '../../context/auth/AuthReducer';
import { AlertContext } from '../../context/alert/AlertContext';
import { AlertActions } from '../../context/alert/AlertReducer';
import { ProjectContext } from '../../context/project/ProjectContext';
import { ProjectActions } from '../../context/project/ProjectReducer';

import { setAuthToken } from '../../utils/httpClient';

const TopBar: FunctionComponent = () => {
    const history = useHistory();
    const { alertDispatch } = useContext(AlertContext);
    const { authState: { user }, authDispatch } = useContext(AuthContext);
    const { projectDispatch } = useContext(ProjectContext);

    const handleLogout = (): void => {
        authDispatch({
            type: AuthActions.Logout
        });

        projectDispatch({
            type: ProjectActions.SetProjects,
            payload: []
        });

        localStorage.removeItem('token');
        setAuthToken();

        alertDispatch({
            type: AlertActions.ClearAlert
        });

        history.push('/');
    };

    return (
        <header className="app-header">
            { user ? <p className="username">Hola, <span>{ user.username }</span></p> : null }
            <nav className="main-nav">
                <button type="button" className="btn btn-blank btn-logout" onClick={ handleLogout }>Cerrar sesión</button>
            </nav>
        </header>
    );
};

export default TopBar;