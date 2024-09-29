import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    description: string;
    type: "movie" | "series" | "anime" | "documentary";
    userId: string;
}

const movieSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    type: { type: String, enum: ['movie', 'series', 'anime', 'documentary'], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);