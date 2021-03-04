import React, { FunctionComponent } from 'react';

import { AlertType } from '../../utils/types';

const Alert: FunctionComponent<{ alert: AlertType }> = ({ alert: { category, message } }) => (
    <div data-cy="alert" className={ `alert alert-${category}` }>{ message }</div>
);

export default Alert;