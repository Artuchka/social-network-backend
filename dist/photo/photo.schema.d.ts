import mongoose, { HydratedDocument } from 'mongoose';
import { Entry } from '../schemas/entry.schema';
export type PhotoDocument = HydratedDocument<Photo>;
export declare class Photo extends Entry {
    path: string;
    likes: number;
    dislikes: number;
}
export declare const PhotoSchema: mongoose.Schema<Photo, mongoose.Model<Photo, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Photo>;
