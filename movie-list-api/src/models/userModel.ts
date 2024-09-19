import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string;
    password: string;
    comparePassword(userPassword: string): Promise<boolean> 
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.methods.comparePassword = function(userPassword: string): Promise<boolean>{
    return bcrypt.compare(userPassword, this.password);
}

export const User = mongoose.model<IUser>('User', userSchema);