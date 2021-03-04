import { AlertState } from './AlertContext';
import { ActionMap, AlertType } from '../../utils/types';

export enum AlertActions {
    SetAlert = 'SET_ALERT',
    ClearAlert = 'CLEAR_ALERT'
}

type AlertPayload = {
    [AlertActions.SetAlert]: {
        alert: AlertType,
        timer: NodeJS.Timeout
    },
    [AlertActions.ClearAlert]: undefined
};

export type AlertActionTypes = ActionMap<AlertPayload>[keyof ActionMap<AlertPayload>];

const AlertReducer = (state: AlertState, action: AlertActionTypes): AlertState => {
    switch (action.type) {
        case AlertActions.SetAlert:
            return {
                ...state,
                ...action.payload
            };
        case AlertActions.ClearAlert:
            return {
                ...state,
                alert: null,
                timer: null
            }
        default:
            return state;
    }
};

export default AlertReducer;
