import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from '../post/post.schema';
import { Comment } from '../comment/comment.schema';
import { Photo } from '../photo/photo.schema';
export type UserEntriesDocument = HydratedDocument<UserEntries>;
export declare class UserEntries {
    posts: Post[];
    comments: Comment[];
    photos: Photo[];
}
export declare const UserEntriesSchema: mongoose.Schema<UserEntries, mongoose.Model<UserEntries, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserEntries>;
