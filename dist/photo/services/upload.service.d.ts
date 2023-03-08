/// <reference types="multer" />
/// <reference types="node" />
import { MinifyImageService } from './minifiyImage.service';
type FileType = 'image' | 'video';
export type ImageType = {
    secure_url: string;
};
export declare class UploadService {
    private minifiyService;
    constructor(minifiyService: MinifyImageService);
    uploadImages(files: Express.Multer.File[]): Promise<{
        savedPercentage: string;
        paths: string[];
    }>;
    uploadToCloud(file: Express.Multer.File, type: FileType, maxSize: number): Promise<{
        image: ImageType;
        bytesSaved: number;
        video?: undefined;
    } | {
        video: ImageType;
        bytesSaved: number;
        image?: undefined;
    }>;
    uploadBufferToCloud(buffer: Buffer, type: FileType): Promise<ImageType>;
    uploadFileToCloud(file: Express.Multer.File, type: FileType): Promise<ImageType>;
    uploadToCloudController(buffer: Buffer, type: FileType): Promise<ImageType>;
}
export {};
