import { Document, model, Schema, Types } from 'mongoose';

import Task from './task.model';

export interface IProject extends Document {
    name: string;
    user: Types.ObjectId;
    createdAt?: Date;
}

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.post('findOneAndDelete', async function (project) {
    await Task.deleteMany({ project: project._id });
});

ProjectSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
    }
});

const Project = model<IProject>('Project', ProjectSchema);

export default Project;