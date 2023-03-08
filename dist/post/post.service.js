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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entries_service_1 = require("../user/services/user-entries.service");
const photo_service_1 = require("../photo/services/photo.service");
let PostService = class PostService {
    constructor(postModel, userEntriesService, photoService) {
        this.postModel = postModel;
        this.userEntriesService = userEntriesService;
        this.photoService = photoService;
    }
    async getAll() {
        const posts = await this.postModel.find();
        return posts;
    }
    async getSingle(id) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException(`Post ${id} not found`);
        }
        return post;
    }
    async create({ userId, dto }) {
        if ('images' in (dto === null || dto === void 0 ? void 0 : dto.content)) {
            await this.photoService._checkPhotos(dto.content.images);
        }
        const newPost = await this.postModel.create(Object.assign(Object.assign({}, dto), { author: userId }));
        this.userEntriesService._addPost({ postId: newPost.id, authorId: userId });
        return newPost;
    }
    async deleteSingle({ userId, postId }) {
        const foundPost = await this.postModel.findById(postId);
        if (!foundPost) {
            throw new common_1.NotFoundException(`No Post with id ${postId}`);
        }
        if (foundPost.author.toString() !== userId) {
            throw new common_1.NotFoundException(`You are not the owner of this Post`);
        }
        this.userEntriesService._removePost({
            postId: foundPost.id,
            authorId: userId,
        });
        await foundPost.delete();
        return foundPost;
    }
    async updateSingle({ userId, postId, dto, }) {
        const foundPost = await this.postModel.findById(postId);
        if (!foundPost) {
            throw new common_1.NotFoundException(`No Post with id ${postId} `);
        }
        if (foundPost.author.toString() !== userId) {
            throw new common_1.NotFoundException(`You are not the owner of this Post`);
        }
        if ('images' in (dto === null || dto === void 0 ? void 0 : dto.content)) {
            await this.photoService._checkPhotos(dto.content.images);
        }
        Object.keys(dto.content).map((key) => {
            foundPost.content[key] = dto.content[key];
        });
        await foundPost.save();
        return foundPost;
    }
    async like(id, userId) {
        const updatedPost = await this.postModel.findOneAndUpdate({ _id: id, liked: { $ne: userId } }, { $push: { liked: userId }, $pull: { disliked: userId } }, {
            new: true,
        });
        this.userEntriesService._addLikeOnPost({
            postId: updatedPost.id,
            authorId: userId,
        });
        return updatedPost;
    }
    async dislike(id, userId) {
        const updatedPost = await this.postModel.findOneAndUpdate({ _id: id, disliked: { $ne: userId } }, { $push: { disliked: userId }, $pull: { liked: userId } }, {
            new: true,
        });
        this.userEntriesService._removeLikeOnPost({
            postId: updatedPost.id,
            authorId: userId,
        });
        return updatedPost;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_entries_service_1.UserEntriesService,
        photo_service_1.PhotoService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map