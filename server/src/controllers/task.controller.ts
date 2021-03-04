import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import Project from '../models/project.model';
import Task from '../models/task.model';

export const getProjectTasks = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { params: { id: projectId }, user } = req;
        const project = await Project.findOne({
            _id: projectId,
            user: user.id
        });

        if (!project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ningún proyecto con el id especificado'
            }]
        });

        const tasks = await Task.find({ project: projectId }, '-project -__v').sort({ createdAt: -1 }).exec();

        res.json({
            ok: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al obtener las tareas'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { body: { name, project: projectId }, user } = req;

        const project = await Project.findOne({
            _id: projectId,
            user: user.id
        });
        if (!project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ningún proyecto con el id especificado'
            }]
        });

        const taskCount = await Task.countDocuments({ project: projectId });
        if (taskCount > 14) return res.status(405).json({
            ok: false,
            errors: [{
                msg: 'Se alcanzó el número máximo de tareas para este proyecto'
            }]
        });

        const task = await Task.create({
            name,
            project: projectId
        });

        res.json({
            ok: true,
            msg: 'Tarea creada satisfactoriamente',
            task
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al crear la tarea'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { body: { name, finished }, params: { id }, user } = req;

        const task = await Task.findOne({ _id: id }).populate({ path: 'project', match: { user: user.id }}).exec();
        if (!task || !task.project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ninguna tarea con el id especificado'
            }]
        });

        const updatedTask = await Task.findOneAndUpdate({ _id: id }, { name, finished }, { new: true, omitUndefined: true, select: '-__v' });

        res.json({
            ok: true,
            msg: 'Tarea actualizada satisfactoriamente',
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al editar la tarea'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const errorValidation = validationResult(req);
        if (!errorValidation.isEmpty()) return res.status(400).json({
            ok: false,
            errors: errorValidation.array()
        });

        const { params: { id }, user } = req;

        const task = await Task.findOne({ _id: id }).populate({ path: 'project', match: { user: user.id }}).exec();
        if (!task || !task.project) return res.status(404).json({
            ok: false,
            errors: [{
                msg: 'No existe ninguna tarea con el id especificado'
            }]
        });

        await Task.findOneAndDelete({ _id: id });

        res.json({
            ok: true,
            msg: 'Tarea eliminada satisfactoriamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errors: [{
                msg: 'Error al eliminar la tarea'
            }, {
                msg: 'Error interno del servidor'
            }]
        });
    }
};