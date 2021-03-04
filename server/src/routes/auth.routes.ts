import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

import { authUser } from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.get('/', isAuthenticated, (_, res: Response) => res.json({
    ok: true,
    msg: 'El usuario está autenticado'
}));

authRouter.post('/', [
    body('email', 'El email es requerido').isEmail(),
    body('password', 'El password es requerido').notEmpty()
], authUser);

export default authRouter;