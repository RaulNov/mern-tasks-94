import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import User from "../models/user.model";

export const authUser = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { body: { email, password } } = req;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            ok: false,
            errors: [{
                msg: 'Este email no está registrado',
                param: 'email'
            }]
        });

        const correctPass = await compare(password, user.password);
        if (!correctPass) return res.status(400).json({
            ok: false,
            errors: [{
                msg: 'El email o el password están incorrectos'
            }]
        });

        const payload = {
            user: (({ _id, username, email, createdAt }) => ({ id: _id, username, email, createdAt }))(user)
        };

        const token = sign(payload, `${process.env.SECRET}`, { expiresIn: 60 * 60 });
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error en la autenticación del usuario'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};