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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const swagger_1 = require("@nestjs/swagger");
const new_comment_dto_1 = require("./dto/new-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_decorator_1 = require("../user/decorators/user.decorator");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getAll() {
        const comments = await this.commentService.getAll();
        return {
            message: 'all comments',
            comments,
        };
    }
    async getSingle(id) {
        const comment = await this.commentService.getSingle(id);
        return {
            message: 'single comment',
            comment,
        };
    }
    async create(dto, userId) {
        const comment = await this.commentService.create({ dto, userId });
        return {
            message: 'created comment',
            comment,
        };
    }
    async deleteSingle(commentId, userId) {
        const comment = await this.commentService.deleteSingle({
            commentId,
            userId,
        });
        return {
            message: 'deleted comment',
            comment,
        };
    }
    async updateSingle(commentId, dto, userId) {
        const comment = await this.commentService.updateSingle({
            commentId,
            dto,
            userId,
        });
        return {
            message: 'updated comment',
            comment,
        };
    }
    async likeComment(id, userId) {
        const comment = await this.commentService.like(id, userId);
        console.log({ comment });
        if (!comment) {
            throw new common_1.BadRequestException(`Alrady liked by ${userId} OR comment doesnot exist`);
        }
        return {
            message: 'liked comment',
            comment,
        };
    }
    async dislikeComment(id, userId) {
        const comment = await this.commentService.dislike(id, userId);
        if (!comment) {
            throw new common_1.BadRequestException(`Alrady disliked by ${userId}`);
        }
        return {
            message: 'disliked comment',
            comment,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all comments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single comment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a comment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_comment_dto_1.NewCommentDto, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteSingle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateSingle", null);
__decorate([
    (0, common_1.Get)(':id/like'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Like comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Get)(':id/dislike'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Dislike comment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "dislikeComment", null);
CommentController = __decorate([
    (0, swagger_1.ApiTags)('Comment'),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map