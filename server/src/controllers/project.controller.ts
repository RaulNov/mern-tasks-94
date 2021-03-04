import { Request, Response } from "express";
import { validationResult } from 'express-validator';

import Project from '../models/project.model';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const { user } = req;
        const projects = await Project.find({ user: user.id }, 'name createdAt').sort({ createdAt: -1 }).exec();
        res.json({
            ok: true,
            projects
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al obtener los proyectos'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { body: { name }, user } = req;

        const projectCount = await Project.countDocuments({ user: user.id });
        if (projectCount > 9) return res.status(405).json({
            ok: false,
            errors: [{
                msg: 'Se ha alcanzado el número máximo de proyectos para este usuario'
            }]
        });

        const project = await Project.create({
            name,
            user: user.id
        });

        res.json({
            ok: true,
            msg: 'Proyecto creado satisfactoriamente',
            project: (({ _id, name, createdAt }) => ({ id: _id, name, createdAt }))(project)
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al crear el proyecto'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { body: { name }, params: { id }, user } = req;

        const project = await Project.findOne({
            _id: id,
            user: user.id
        });

        if (!project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ningún proyecto con el id especificado'
            }]
        });

        const updatedProject = await Project.findByIdAndUpdate(id, { $set: { name } }, { new: true, select: 'name createdAt' });

        res.json({
            ok: true,
            msg: 'Proyecto actualizado satisfactoriamente',
            project: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al actualizar el proyecto'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { params: { id }, user } = req;
        
        const project = await Project.findOne({
            _id: id,
            user: user.id
        });

        if (!project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ningún proyecto con el id especificado'
            }]
        });

        await Project.findOneAndDelete({ _id: id });

        res.json({
            ok: true,
            msg: 'Proyecto eliminado satisfactoriamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al eliminar el proyecto'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};