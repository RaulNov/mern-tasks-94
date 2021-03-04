import React, { FunctionComponent, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';

import Spinner from '../UI/Spinner';

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
    const { authState: { isAuthenticated, loadingAuth } } = useContext(AuthContext);

    return (
        <Route { ...rest } render={ ({ location }) => isAuthenticated ?
            children
            : loadingAuth ?
                <div className="loading-container">
                    <Spinner />
                </div>
                : <Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }} />
        }/>
    );
};
 
export default PrivateRoute;