/// <reference types="multer" />
import { PhotoDocument } from '../photo.schema';
import mongoose, { Model } from 'mongoose';
import { NewPhotoDto } from '../dto/new-photo.dto';
import { UpdatePhotoDto } from '../dto/update-photo.dto';
import { UserEntriesService } from '../../user/services/user-entries.service';
import { UploadService } from './upload.service';
export declare class PhotoService {
    private readonly photoModel;
    private readonly userEntriesService;
    private readonly uploadService;
    constructor(photoModel: Model<PhotoDocument>, userEntriesService: UserEntriesService, uploadService: UploadService);
    getAll(): Promise<(mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    getSingle(id: string): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    create({ author, dto }: {
        author: string;
        dto: NewPhotoDto;
    }): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    deleteSingle({ photoId, userId }: {
        photoId: string;
        userId: string;
    }): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    updateSingle({ photoId, dto, userId, }: {
        photoId: string;
        dto: UpdatePhotoDto;
        userId: string;
    }): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    like(id: string, userId: string): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    dislike(id: string, userId: string): Promise<mongoose.Document<unknown, any, import("../photo.schema").Photo> & import("../photo.schema").Photo & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    _checkPhotos(photos: string[]): Promise<void>;
    uploadImages({ author, files, }: {
        author: string;
        files: Express.Multer.File[];
    }): Promise<{
        paths: string[];
        savedPercentage: string;
    }>;
}
