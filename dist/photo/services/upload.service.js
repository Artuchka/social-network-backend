"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const minifiyImage_service_1 = require("./minifiyImage.service");
const streamifier = require('streamifier');
let UploadService = class UploadService {
    constructor(minifiyService) {
        this.minifiyService = minifiyService;
        cloudinary_1.v2.config({
            secure: true,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
            api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
        });
    }
    async uploadImages(files) {
        const maxSizeImage = 1024 * 1024 * 2;
        if (!files || (files === null || files === void 0 ? void 0 : files.length) < 1) {
            throw new common_1.BadRequestException(`Пожалуйста, предоставьте фото`);
        }
        let initialBytesAmount = 0;
        const uploadFileInfo = await Promise.all(files.map(async (img) => {
            initialBytesAmount += img.size;
            return await this.uploadToCloud(img, 'image', maxSizeImage);
        }));
        let allBytesSaved = 0;
        const uploadPaths = uploadFileInfo.map((uploadInfo) => {
            const imageInfo = uploadInfo.image;
            allBytesSaved += uploadInfo.bytesSaved;
            return imageInfo.secure_url;
        });
        const savedPercentage = ((allBytesSaved / initialBytesAmount) *
            100).toFixed(2);
        return {
            savedPercentage,
            paths: uploadPaths,
        };
    }
    async uploadToCloud(file, type, maxSize) {
        var _a;
        let regex = /image\//;
        if (type === 'video') {
            regex = /video\//;
        }
        if (!((_a = file === null || file === void 0 ? void 0 : file.mimetype) === null || _a === void 0 ? void 0 : _a.match(regex))) {
            throw new common_1.BadRequestException(`Пожалуйста предоставьте файлы типа ${type}`);
        }
        if ((file === null || file === void 0 ? void 0 : file.size) > maxSize) {
            throw new common_1.BadRequestException(`Файл слишком большой, отправляйте до ${maxSize / 1024 / 1024} MB = ${maxSize} bytes`);
        }
        if (type === 'image') {
            const { minifiedBuffer, bytesSaved } = await this.minifiyService.minifyImage(file);
            if (!minifiedBuffer) {
                throw new common_1.BadRequestException(`Unable to minify`);
            }
            const image = await this.uploadBufferToCloud(minifiedBuffer, type);
            console.log({ minifiedBuffer, bytesSaved });
            return { image, bytesSaved };
        }
        if (type === 'video') {
            const video = await this.uploadFileToCloud(file, type);
            return { video, bytesSaved: 0 };
        }
    }
    uploadBufferToCloud(buffer, type) {
        return this.uploadToCloudController(buffer, type);
    }
    uploadFileToCloud(file, type) {
        return this.uploadToCloudController(file.buffer, type);
    }
    async uploadToCloudController(buffer, type) {
        return await new Promise((resolve, reject) => {
            let stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'OZON', resource_type: type }, (error, result) => {
                if (result) {
                    resolve(result);
                }
                else {
                    reject(error);
                }
            });
            streamifier.createReadStream(buffer).pipe(stream);
        });
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [minifiyImage_service_1.MinifyImageService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map