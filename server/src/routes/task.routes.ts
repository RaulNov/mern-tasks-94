import { Router } from "express";
import { body, param } from "express-validator";

import isAuthenticated from "../middlewares/auth.middleware";
import { getProjectTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/project/:id',
    isAuthenticated,
    [
        param('id', 'El id del proyecto es inválido').isMongoId()
    ],
    getProjectTasks
);

taskRouter.post('/',
    isAuthenticated,
    [
        body('project', 'El id del proyecto es inválido').isMongoId(),
        body('name', 'El nombre de la tarea es requerido').trim().notEmpty()
    ],
    createTask
);

taskRouter.put('/:id',
    isAuthenticated,
    [
        param('id', 'El id de la tarea es inválido').isMongoId(),
        body('name', 'El nombre de la tarea no puede estar vacío').if(body('name').exists()).notEmpty(),
        body('finished', 'El valor del estatus de la tarea es inválido').if(body('finished').exists()).isBoolean(),
    ],
    updateTask
);

taskRouter.delete('/:id',
    isAuthenticated,
    [
        param('id', 'El id de la tarea es inválido').isMongoId()
    ],
    deleteTask
);

export default taskRouter;