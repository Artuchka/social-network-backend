import mongoose, { HydratedDocument } from 'mongoose';
import { Entry } from '../schemas/entry.schema';
import { Content } from '../schemas/content.schema';
import { Post } from '../post/post.schema';
import { Photo } from '../photo/photo.schema';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment extends Entry {
    sourceType: string;
    source: Post | Photo;
    reply: Comment;
    content: Content;
    likes: number;
    dislikes: number;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
