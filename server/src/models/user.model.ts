import { Document, model, Schema } from "mongoose";
import { hash, genSalt } from 'bcryptjs';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    createdAt?: Date
}

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: async (v: string) => {
                const user = await User.findOne({ email: v });
                if (user) return Promise.reject(new Error('El correo ya ha sido registrado'));
                return Promise.resolve(true);
            }
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre<IUser>('save', async function () {
    if(this.isModified('password')) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
});

const User = model<IUser>('User', UserSchema);

export default User;