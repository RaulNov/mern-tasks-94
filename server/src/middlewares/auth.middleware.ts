import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).json({
            ok: false,
            errors: [{
                msg: 'No se encontró el token en la petición, permiso denegado'
            }]
        });

        verify(token, `${process.env.SECRET}`, function (err, decoded) {
            if (err) return res.status(401).json({
                ok: false,
                errors: [{
                    msg: 'Token inválido, permiso denegado'
                }]
            });

            req.user = (<any>decoded).user;
            next();
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export default isAuthenticated;