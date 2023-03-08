/// <reference types="multer" />
/// <reference types="node" />
export declare class MinifyImageService {
    constructor();
    minifyImage(image: Express.Multer.File): Promise<{
        minifiedBuffer: Buffer;
        bytesSaved: number;
    }>;
}
