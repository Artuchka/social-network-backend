import mongoose, { HydratedDocument } from 'mongoose';
import { Entry } from '../schemas/entry.schema';
import { Content } from '../schemas/content.schema';
export type PostDocument = HydratedDocument<Post>;
export declare class Post extends Entry {
    content: Content;
    likes: number;
    dislikes: number;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post>;
