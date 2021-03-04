import { Document, model, Schema, Types } from 'mongoose';

export interface ITask extends Document {
    name: string;
    finished?: boolean;
    project: Types.ObjectId;
    createdAt?: Date
}

const TaskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
    }
});


const Task = model<ITask>('Task', TaskSchema);

export default Task;