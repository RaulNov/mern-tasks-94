import React, { createContext, Dispatch, FunctionComponent, useReducer } from 'react';

import AlertReducer, { AlertActions, AlertActionTypes } from './AlertReducer';

import { AlertType } from '../../utils/types';

export type AlertState = {
    alert: AlertType | null,
    timer: NodeJS.Timeout | null
};

type AlertContextType = {
    alertState: AlertState,
    alertDispatch: Dispatch<AlertActionTypes>,
    setAlertFn(alert: AlertType): void
};

const initialState: AlertState = {
    alert: null,
    timer: null
};

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export const AlertProvider: FunctionComponent = ({ children }) => {
    const [alertState, alertDispatch] = useReducer(AlertReducer, initialState);

    const setAlertFn = (alert: AlertType): void => {
        if (alertState.timer) {
            clearTimeout(alertState.timer);
            alertDispatch({
                type: AlertActions.ClearAlert
            });
        }

        const timer = setTimeout(() => {
            alertDispatch({
                type: AlertActions.ClearAlert
            });
        }, 3 * 1000);

        alertDispatch({
            type: AlertActions.SetAlert,
            payload: {
                alert,
                timer
            }
        });
    };

    return (
        <AlertContext.Provider value={{ alertState, alertDispatch, setAlertFn }}>
            { children }
        </AlertContext.Provider>
    );
};