import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    description: string;
    type: string;
    userId: string;
}

const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, required: true },
    userId: { type: String, required: true },
});

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);
