import { Request, Response } from "express";
import { validationResult } from "express-validator";

import User from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });
        
        const { body: { username, email, password } } = req;

        const userCount = await User.estimatedDocumentCount();
        if (userCount > 4) return res.status(405).json({
            ok: false,
            errors: [{
                msg: 'El número de usuarios ha llegado al máximo'
            }]
        });
        
        await User.create({
            username,
            email,
            password
        });
        
        res.json({
            ok: true,
            msg: 'Usuario creado satisfactoriamente'
        });
    } catch (error) {
        const errors = error.errors ? Object.keys(error.errors).map(item => ({
            msg: error.errors[item].message,
            param: item
        })) : [];

        res.status(errors.length ? 400 : 500).json({
            ok: false,
            errors: errors.length ? errors : [{
                msg: 'Error en la creación del usuario'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};