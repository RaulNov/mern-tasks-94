import React, { ChangeEvent, FormEvent, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';
import { AuthActions } from '../../context/auth/AuthReducer';
import { AlertContext } from '../../context/alert/AlertContext';
import { AlertActions } from '../../context/alert/AlertReducer';

import Alert from '../UI/Alert';
import Spinner from '../UI/Spinner';

import { login } from '../../utils/auth.utils';
import { AlertType, UserDecodedType } from '../../utils/types';

interface UserType {
    email: string,
    password: string
}

const Login: FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation<{ from: { pathname: string } }>();
    let { from } = location.state || { from: { pathname: '/projects' } };

    const { alertState: { alert }, alertDispatch, setAlertFn } = useContext(AlertContext);
    const { authState: { isAuthenticated, loadingAuth },  authDispatch } = useContext(AuthContext)
    const [user, setUser] = useState<UserType>({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setAlertFn({
                message: 'Todos los campos son obligatorios',
                category: 'error'
            });
            return;
        }

        const { token, userDecoded, alert } = await login(email, password);
        if (!token) {
            setAlertFn(alert as AlertType);
            return;
        }

        alertDispatch({
            type: AlertActions.ClearAlert
        });
        
        authDispatch({
            type: AuthActions.SuccessfullAuth,
            payload: {
                token,
                user: userDecoded as UserDecodedType
            }
        });
    };

    const redirect = useCallback(() => history.replace(from), [history, from]);

    useEffect(() => {
        if (isAuthenticated && !loadingAuth) redirect();
    }, [isAuthenticated, loadingAuth, redirect]);

    return (
        <div className="user-form">
            { loadingAuth
                ? <Spinner />
                : <>
                    { alert && <Alert alert={ alert } /> }
                    <div className="form-container dark-shadow">
                        <h1 data-cy="login-title">Iniciar sesión</h1>
                        <form data-cy="login-form" onSubmit={ handleSubmit }>
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input data-cy="email-input" type="email" name="email" id="email" placeholder="Tu email" onChange={ handleChange }/>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Password</label>
                                <input data-cy="password-input" type="password" name="password" id="password" placeholder="Tu password" onChange={ handleChange }/>
                            </div>
                            <div className="form-field">
                                <input data-cy="login-submit" type="submit" value="Iniciar sesión" className="btn btn-primary btn-block"/>
                            </div>
                        </form>
                        <Link data-cy="new-profile-link" to="/new-profile" className="new-profile-link">Obtener cuenta</Link>
                    </div>
                </>
            }
        </div>
    );
};

export default Login;