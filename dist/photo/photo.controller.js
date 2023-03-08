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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../user/decorators/user.decorator");
const photo_service_1 = require("./services/photo.service");
const new_photo_dto_1 = require("./dto/new-photo.dto");
const update_photo_dto_1 = require("./dto/update-photo.dto");
const platform_express_1 = require("@nestjs/platform-express");
let PhotoController = class PhotoController {
    constructor(photoService) {
        this.photoService = photoService;
    }
    async getAll() {
        const photos = await this.photoService.getAll();
        return {
            message: 'all photos',
            photos,
        };
    }
    async getSingle(id) {
        const photo = await this.photoService.getSingle(id);
        return {
            message: 'single photo',
            photo,
        };
    }
    async uploadPhoto(files, author) {
        console.log({ files });
        const { paths, savedPercentage } = await this.photoService.uploadImages({
            author,
            files,
        });
        return {
            message: `${files.length} фото загружено, сжали на ${savedPercentage}% 🤞`,
            paths,
        };
    }
    async create(dto, author) {
        const photo = await this.photoService.create({ author, dto });
        return {
            message: 'created photo',
            photo,
        };
    }
    async deleteSingle(photoId, userId) {
        const photo = await this.photoService.deleteSingle({ photoId, userId });
        return {
            message: 'deleted photo',
            photo,
        };
    }
    async updateSingle(photoId, dto, userId) {
        const photo = await this.photoService.updateSingle({ photoId, dto, userId });
        return {
            message: 'updated photo',
            photo,
        };
    }
    async likePhoto(id, userId) {
        const photo = await this.photoService.like(id, userId);
        console.log({ photo });
        if (!photo) {
            throw new common_1.BadRequestException(`Alrady liked by ${userId} OR photo doesnot exist`);
        }
        return {
            message: 'liked photo',
            photo,
        };
    }
    async dislikePhoto(id, userId) {
        const photo = await this.photoService.dislike(id, userId);
        if (!photo) {
            throw new common_1.BadRequestException(`Alrady disliked by ${userId}`);
        }
        return {
            message: 'disliked photo',
            photo,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all photos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single photo' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a photo' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a photo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_photo_dto_1.NewPhotoDto, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete photo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "deleteSingle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update photo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_photo_dto_1.UpdatePhotoDto, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "updateSingle", null);
__decorate([
    (0, common_1.Get)(':id/like'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Like photo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "likePhoto", null);
__decorate([
    (0, common_1.Get)(':id/dislike'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Dislike photo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "dislikePhoto", null);
PhotoController = __decorate([
    (0, swagger_1.ApiTags)('Photo'),
    (0, common_1.Controller)('photo'),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], PhotoController);
exports.PhotoController = PhotoController;
//# sourceMappingURL=photo.controller.js.map