import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../user/schemas/user.schema';
export type EntryDocument = HydratedDocument<Entry>;
export declare class Entry {
    author: User | string;
    liked: User[];
    disliked: User[];
    comments: Comment[];
}
export declare const EntrySchema: mongoose.Schema<Entry, mongoose.Model<Entry, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Entry>;
