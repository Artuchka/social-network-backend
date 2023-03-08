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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { NewPostDto } from './dto/new-post.dto';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAll(): Promise<{
        message: string;
        posts: (import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getSingle(id: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(dto: NewPostDto, userId: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteSingle(postId: string, userId: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateSingle(postId: string, dto: UpdatePostDto, userId: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    likePost(id: string, userId: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    dislikePost(id: string, userId: string): Promise<{
        message: string;
        post: import("mongoose").Document<unknown, any, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
