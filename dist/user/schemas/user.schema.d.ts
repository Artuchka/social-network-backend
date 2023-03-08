import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../enums/role.enum';
import { Gender } from '../enums/gender.enum';
import { Photo } from '../../photo/photo.schema';
import { UserEntries } from '../../schemas/user-entries.schema';
import { UserInfo } from './user-info.schema';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    username: string;
    roles: [Role];
    gender: Gender;
    avatar: Photo | string;
    info: UserInfo;
    friends: User[];
    following: User[];
    followers: User[];
    entries: UserEntries;
    likes: UserEntries;
    id: string;
    fullname: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
