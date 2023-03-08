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
import { CommentService } from './comment.service';
import { NewCommentDto } from './dto/new-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getAll(): Promise<{
        message: string;
        comments: (import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getSingle(id: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    create(dto: NewCommentDto, userId: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteSingle(commentId: string, userId: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateSingle(commentId: string, dto: UpdateCommentDto, userId: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    likeComment(id: string, userId: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    dislikeComment(id: string, userId: string): Promise<{
        message: string;
        comment: import("mongoose").Document<unknown, any, import("./comment.schema").Comment> & import("./comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
