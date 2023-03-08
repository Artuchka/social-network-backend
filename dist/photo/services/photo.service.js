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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entries_service_1 = require("../../user/services/user-entries.service");
const upload_service_1 = require("./upload.service");
let PhotoService = class PhotoService {
    constructor(photoModel, userEntriesService, uploadService) {
        this.photoModel = photoModel;
        this.userEntriesService = userEntriesService;
        this.uploadService = uploadService;
    }
    async getAll() {
        const photos = await this.photoModel.find();
        return photos;
    }
    async getSingle(id) {
        const photo = await this.photoModel.findById(id);
        if (!photo) {
            throw new common_1.NotFoundException(`No Photo with id ${id} `);
        }
        return photo;
    }
    async create({ author, dto }) {
        console.log({ dto });
        const newPhoto = await this.photoModel.create(Object.assign(Object.assign({}, dto), { author }));
        this.userEntriesService._addPhoto({
            authorId: author,
            photoId: newPhoto.id,
        });
        return newPhoto;
    }
    async deleteSingle({ photoId, userId }) {
        const foundPhoto = await this.photoModel.findById(photoId);
        if (!foundPhoto) {
            throw new common_1.NotFoundException(`No Photo with id ${photoId} `);
        }
        if (foundPhoto.author.toString() !== userId) {
            throw new common_1.NotFoundException(` your are not the owner of this photo`);
        }
        this.userEntriesService._removePhoto({
            authorId: userId,
            photoId: photoId,
        });
        await foundPhoto.delete();
        return foundPhoto;
    }
    async updateSingle({ photoId, dto, userId, }) {
        const foundPhoto = await this.photoModel.findById(photoId);
        if (!foundPhoto) {
            throw new common_1.NotFoundException(`No Photo with id ${photoId} `);
        }
        if (foundPhoto.author.toString() !== userId) {
            throw new common_1.NotFoundException(` your are not the owner of this photo`);
        }
        foundPhoto.path = dto.path;
        await foundPhoto.save();
        return foundPhoto;
    }
    async like(id, userId) {
        const updatedPhoto = await this.photoModel.findOneAndUpdate({ _id: id, liked: { $ne: userId } }, { $push: { liked: userId }, $pull: { disliked: userId } }, {
            new: true,
        });
        this.userEntriesService._addLikeOnPhoto({
            photoId: updatedPhoto.id,
            authorId: userId,
        });
        return updatedPhoto;
    }
    async dislike(id, userId) {
        const updatedPhoto = await this.photoModel.findOneAndUpdate({ _id: id, disliked: { $ne: userId } }, { $push: { disliked: userId }, $pull: { liked: userId } }, {
            new: true,
        });
        this.userEntriesService._removeLikeOnPhoto({
            photoId: updatedPhoto.id,
            authorId: userId,
        });
        return updatedPhoto;
    }
    async _checkPhotos(photos) {
        const photoPromises = photos.map(async (photoId) => {
            return await this.getSingle(photoId);
        });
        const ans = await Promise.all(photoPromises)
            .then((data) => {
            return data;
        })
            .catch((err) => {
            return err;
        });
        if (ans instanceof Error) {
            throw new common_1.BadRequestException(ans.message);
        }
    }
    async uploadImages({ author, files, }) {
        const { paths, savedPercentage } = await this.uploadService.uploadImages(files);
        return {
            paths,
            savedPercentage,
        };
    }
};
PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Photo')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_entries_service_1.UserEntriesService,
        upload_service_1.UploadService])
], PhotoService);
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map