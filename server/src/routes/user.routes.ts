import { Router } from 'express';
import { body } from 'express-validator';

import { createUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', [
    body('username', 'El username es obligatorio').trim().notEmpty(),
    body('email', 'Introduce un email válido').isEmail(),
    body('password', 'El password debe tener al menos 6 caracteres').trim().isLength({ min: 6 })
], createUser);

export default userRouter;