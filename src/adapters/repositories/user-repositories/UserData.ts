import { Schema, model } from 'mongoose';

interface User {
    id: number
    username: string;
    email: string;
    password: string;
    name: string;
}

const schema = new Schema<User>({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})

export const UserModel = model<User>('User', schema)
