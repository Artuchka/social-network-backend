/// <reference types="multer" />
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
import { PhotoService } from './services/photo.service';
import { NewPhotoDto } from './dto/new-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
export declare class PhotoController {
    private photoService;
    constructor(photoService: PhotoService);
    getAll(): Promise<{
        message: string;
        photos: (import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getSingle(id: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    uploadPhoto(files: Express.Multer.File[], author: string): Promise<{
        message: string;
        paths: string[];
    }>;
    create(dto: NewPhotoDto, author: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteSingle(photoId: string, userId: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateSingle(photoId: string, dto: UpdatePhotoDto, userId: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    likePhoto(id: string, userId: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    dislikePhoto(id: string, userId: string): Promise<{
        message: string;
        photo: import("mongoose").Document<unknown, any, import("./photo.schema").Photo> & import("./photo.schema").Photo & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
