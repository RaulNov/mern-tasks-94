import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';

const NotFound: FunctionComponent = () => {
    const history = useHistory();
    const { authState: { isAuthenticated, loadingAuth } } = useContext(AuthContext);

    const navigate = () => {
        history.push(isAuthenticated ? '/projects' : '/');
    };

    return (
        <div className="not-found-wrapper">
            <div className="not-found-title">
                <h1>404</h1>
            </div>
            <div className="not-found-message">
                <div>
                    <h2>OH NO!</h2>
                    <p>La página que estás buscando no existe. El como llegaste hasta aquí es un misterio pero puedes
                        dar click al botón que hay debajo para retomar el camino.</p>
                    {
                        !loadingAuth && <button className="btn btn-primary" onClick={ navigate }>{ isAuthenticated ? 'Inicio' : 'Iniciar sesión' }</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default NotFound;