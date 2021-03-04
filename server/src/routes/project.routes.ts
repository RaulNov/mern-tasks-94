import { Router } from "express";
import { body, param } from "express-validator";

import isAuthenticated from '../middlewares/auth.middleware';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/project.controller';

const projectRouter = Router();

projectRouter.get('/',
    isAuthenticated,
    getProjects
);

projectRouter.post('/',
    isAuthenticated,
    [
        body('name', 'El nombre del proyecto es requerido').trim().notEmpty()
    ],
    createProject
);

projectRouter.put('/:id',
    isAuthenticated, [
        body('name', 'El nombre del proyecto es requerido').trim().notEmpty(),
        param('id', 'El id del proyecto es inválido').isMongoId()
    ],
    updateProject
);

projectRouter.delete('/:id',
    isAuthenticated,
    [
        param('id', 'El id del proyecto es inválido').isMongoId()
    ],
    deleteProject
);

export default projectRouter;