import { Photo } from '../photo/photo.schema';
import mongoose from 'mongoose';
export declare class Content {
    text: string;
    images: Photo[] | string[];
}
export declare const ContentSchema: mongoose.Schema<Content, mongoose.Model<Content, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Content>;
