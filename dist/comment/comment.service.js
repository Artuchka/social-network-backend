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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_entries_service_1 = require("../user/services/user-entries.service");
const photo_service_1 = require("../photo/services/photo.service");
const source_type_enum_1 = require("./source-type.enum");
const post_service_1 = require("../post/post.service");
let CommentService = class CommentService {
    constructor(commentModel, userEntriesService, photoService, postService) {
        this.commentModel = commentModel;
        this.userEntriesService = userEntriesService;
        this.photoService = photoService;
        this.postService = postService;
    }
    async getAll() {
        const comment = await this.commentModel.find();
        return comment;
    }
    async getSingle(id) {
        const comment = await this.commentModel.findById(id);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment ${id} not found`);
        }
        return comment;
    }
    async create({ dto, userId }) {
        const { source, sourceType, reply } = dto;
        let sourceDocument = null;
        if (sourceType === source_type_enum_1.SourceType.PHOTO) {
            sourceDocument = await this.photoService.getSingle(source);
        }
        else if (sourceType === source_type_enum_1.SourceType.POST) {
            sourceDocument = await this.postService.getSingle(source);
        }
        let parentComment = null;
        if (reply) {
            parentComment = await this.getSingle(reply);
            if (parentComment.source.toString() !== source) {
                throw new common_1.BadRequestException(`comment from source = ${source} cannot be replied to comment with (!different) source ${parentComment.source} `);
            }
        }
        if ('images' in (dto === null || dto === void 0 ? void 0 : dto.content)) {
            await this.photoService._checkPhotos(dto.content.images);
        }
        const comment = await this.commentModel.create(Object.assign(Object.assign({}, dto), { author: userId }));
        if (reply) {
            parentComment.comments.push(comment.id);
            await parentComment.save();
        }
        sourceDocument.comments.push(comment.id);
        await sourceDocument.save();
        this.userEntriesService._addComment({
            authorId: userId,
            commentId: comment.id,
        });
        return comment;
    }
    async deleteSingle({ commentId, userId, }) {
        const foundComment = await this.commentModel.findById(commentId);
        if (!foundComment) {
            throw new common_1.NotFoundException(`No Comment with id ${commentId}`);
        }
        if (foundComment.author.toString() !== userId) {
            throw new common_1.NotFoundException(`You are not the owner of this Comment`);
        }
        this.userEntriesService._removeComment({
            authorId: userId,
            commentId,
        });
        await foundComment.delete();
        return foundComment;
    }
    async updateSingle({ commentId, dto, userId, }) {
        const foundComment = await this.commentModel.findById(commentId);
        if (!foundComment) {
            throw new common_1.NotFoundException(`No Comment with id ${commentId} `);
        }
        if (foundComment.author.toString() !== userId) {
            throw new common_1.NotFoundException(`You are not the owner of this Comment`);
        }
        if ('images' in (dto === null || dto === void 0 ? void 0 : dto.content)) {
            await this.photoService._checkPhotos(dto.content.images);
        }
        Object.keys(dto.content).map((key) => {
            foundComment.content[key] = dto.content[key];
        });
        await foundComment.save();
        return foundComment;
    }
    async like(id, userId) {
        const updatedComment = await this.commentModel.findOneAndUpdate({ _id: id, liked: { $ne: userId } }, { $push: { liked: userId }, $pull: { disliked: userId } }, {
            new: true,
        });
        this.userEntriesService._addLikeOnComment({
            commentId: updatedComment.id,
            authorId: userId,
        });
        return updatedComment;
    }
    async dislike(id, userId) {
        const updatedComment = await this.commentModel.findOneAndUpdate({ _id: id, disliked: { $ne: userId } }, { $push: { disliked: userId }, $pull: { liked: userId } }, {
            new: true,
        });
        this.userEntriesService._removeLikeOnComment({
            commentId: updatedComment.id,
            authorId: userId,
        });
        return updatedComment;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Comment')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_entries_service_1.UserEntriesService,
        photo_service_1.PhotoService,
        post_service_1.PostService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map