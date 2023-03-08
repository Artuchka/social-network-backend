/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { PostDocument } from './post.schema';
import { NewPostDto } from './dto/new-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserEntriesService } from '../user/services/user-entries.service';
import { PhotoService } from '../photo/services/photo.service';
export declare class PostService {
    private readonly postModel;
    private readonly userEntriesService;
    private readonly photoService;
    constructor(postModel: Model<PostDocument>, userEntriesService: UserEntriesService, photoService: PhotoService);
    getAll(): Promise<(import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getSingle(id: string): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create({ userId, dto }: {
        userId: string;
        dto: NewPostDto;
    }): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteSingle({ userId, postId }: {
        postId: string;
        userId: string;
    }): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateSingle({ userId, postId, dto, }: {
        userId: string;
        postId: string;
        dto: UpdatePostDto;
    }): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    like(id: string, userId: string): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    dislike(id: string, userId: string): Promise<import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
