import React, { ChangeEvent, FormEvent, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';
import { AlertContext } from '../../context/alert/AlertContext';

import Alert from '../UI/Alert';

import { createUser } from '../../utils/user.utils';

interface NewUserType {
    name: string,
    email: string,
    password: string,
    confirm: string
}

const initialState: NewUserType = {
    name: '',
    email: '',
    password: '',
    confirm: ''
};

const NewProfile: FunctionComponent = () => {
    const history = useHistory();
    const location = useLocation<{ from: { pathname: string } }>();
    let { from } = location.state || { from: { pathname: '/projects' } };

    const { authState: { isAuthenticated, loadingAuth } } = useContext(AuthContext);
    const { alertState: { alert }, setAlertFn } = useContext(AlertContext);
    const [newUser, setNewUser] = useState<NewUserType>(initialState);

    const { name, email, password, confirm } = newUser;

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
            setAlertFn({
                message: 'Todos los campos son obligatorios',
                category: 'error'
            });
            return;
        }

        if (password.length < 6) {
            setAlertFn({
                message: 'La contraseña debe tener al menos 6 caracteres',
                category: 'error'
            });
            return;
        }

        if (password !== confirm) {
            setAlertFn({
                message: 'Las contraseñas no son iguales',
                category: 'error'
            });
            return;
        }

        const newUserAlert = await createUser(name, email, password);
        if (newUserAlert.category === 'success') setNewUser(initialState);
        setAlertFn(newUserAlert);
    };

    const redirect = useCallback(() => history.replace(from), [history, from]);

    useEffect(() => {
        if (isAuthenticated && !loadingAuth) redirect();
    }, [isAuthenticated, loadingAuth, redirect]);

    return (
        <div className="user-form">
            { alert && <Alert alert={ alert } /> }
            <div className="form-container dark-shadow">
                <h1 data-cy="new-profile-title">Obtener una cuenta</h1>
                <form data-cy="new-profile-form" onSubmit={ handleSubmit }>
                <div className="form-field">
                        <label htmlFor="name">Nombre</label>
                        <input data-cy="username-input" type="text" name="name" value={ name } placeholder="Tu nombre" onChange={ handleChange }/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input data-cy="email-input" type="email" name="email" value={ email } placeholder="Tu email" onChange={ handleChange }/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input data-cy="password-input" type="password" name="password" value={ password } placeholder="Tu password" onChange={ handleChange }/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirm">Confirmar password</label>
                        <input data-cy="confirm-password-input" type="password" name="confirm" value={ confirm } placeholder="Repite tu password" onChange={ handleChange }/>
                    </div>
                    <div className="form-field">
                        <input data-cy="new-profile-submit" type="submit" value="Registrarse" className="btn btn-primary btn-block"/>
                    </div>
                </form>
                <Link data-cy="login-link" to="/" className="new-profile-link">Volver a inicio de sesión</Link>
            </div>
        </div>
    );
};

export default NewProfile;