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
exports.UserEntriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserEntriesService = class UserEntriesService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async _addPost({ postId, authorId }) {
        this._entryAdder({ entryId: postId, authorId, entryName: 'posts' });
    }
    async _removePost({ postId, authorId }) {
        this._entryRemover({ entryId: postId, authorId, entryName: 'posts' });
    }
    async _addComment({ commentId, authorId }) {
        this._entryAdder({ entryId: commentId, authorId, entryName: 'comments' });
    }
    async _removeComment({ commentId, authorId }) {
        this._entryRemover({ entryId: commentId, authorId, entryName: 'comments' });
    }
    async _addPhoto({ photoId, authorId }) {
        this._entryAdder({ entryId: photoId, authorId, entryName: 'photos' });
    }
    async _removePhoto({ photoId, authorId }) {
        this._entryRemover({ entryId: photoId, authorId, entryName: 'photos' });
    }
    async _entryAdder({ entryId, authorId, entryName }) {
        const user = await this.userModel.findByIdAndUpdate(authorId, {
            $push: { [`entries.${entryName}`]: entryId },
        }, {
            upsert: true,
            new: true,
        });
    }
    async _entryRemover({ entryId, authorId, entryName }) {
        const user = await this.userModel.findByIdAndUpdate(authorId, {
            $pull: { [`entries.${entryName}`]: entryId },
        }, { new: true });
    }
    async _addLikeOnPost({ postId, authorId }) {
        this._entryLikesAdder({ entryId: postId, authorId, entryName: 'posts' });
    }
    async _removeLikeOnPost({ postId, authorId }) {
        this._entryLikesRemover({ entryId: postId, authorId, entryName: 'posts' });
    }
    async _addLikeOnComment({ commentId, authorId }) {
        this._entryLikesAdder({
            entryId: commentId,
            authorId,
            entryName: 'comments',
        });
    }
    async _removeLikeOnComment({ commentId, authorId }) {
        this._entryLikesRemover({
            entryId: commentId,
            authorId,
            entryName: 'comments',
        });
    }
    async _addLikeOnPhoto({ photoId, authorId }) {
        this._entryLikesAdder({ entryId: photoId, authorId, entryName: 'photos' });
    }
    async _removeLikeOnPhoto({ photoId, authorId }) {
        this._entryLikesRemover({ entryId: photoId, authorId, entryName: 'photos' });
    }
    async _entryLikesAdder({ entryId, authorId, entryName }) {
        const user = await this.userModel.findByIdAndUpdate(authorId, {
            $push: { [`likes.${entryName}`]: entryId },
        }, {
            upsert: true,
            new: true,
        });
    }
    async _entryLikesRemover({ entryId, authorId, entryName }) {
        const user = await this.userModel.findByIdAndUpdate(authorId, {
            $pull: { [`likes.${entryName}`]: entryId },
        }, { new: true });
    }
};
UserEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserEntriesService);
exports.UserEntriesService = UserEntriesService;
//# sourceMappingURL=user-entries.service.js.map