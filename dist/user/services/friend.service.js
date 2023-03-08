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
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FriendService = class FriendService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async friendRequest({ requestorId, recieverId }) {
        const requestor = await this.userModel.findById(requestorId);
        const reciever = await this.userModel.findById(recieverId);
        if (!requestor || !reciever) {
            throw new common_1.BadRequestException(`${requestorId} or/and ${recieverId} is not a member of social network`);
        }
        const requestorAlreadyFollowingReciever = reciever.followers.includes(requestorId) &&
            requestor.following.includes(recieverId);
        if (requestorAlreadyFollowingReciever) {
            throw new common_1.BadRequestException(`Requestor is already following reciever`);
        }
        const recieverAlreadyFollowingRequestor = reciever.following.includes(requestorId) &&
            requestor.followers.includes(recieverId);
        if (recieverAlreadyFollowingRequestor) {
            throw new common_1.BadRequestException(`Reciever is already following requestor. Please, send /friendConfirm from requestor`);
        }
        const requestorAlreadyFriendsWithReciever = reciever.friends.includes(requestorId) &&
            requestor.friends.includes(recieverId);
        if (requestorAlreadyFriendsWithReciever) {
            throw new common_1.BadRequestException(`Requestor is already friends with reciever`);
        }
        console.log({ requestorAlreadyFollowingReciever });
        console.log({ recieverAlreadyFollowingRequestor });
        console.log({ requestorAlreadyFriendsWithReciever });
        const newRequestor = await this.userModel.findByIdAndUpdate(requestorId, {
            $push: { following: recieverId },
        }, { new: true });
        const newReciever = await this.userModel.findByIdAndUpdate(recieverId, {
            $push: { followers: requestorId },
        }, { new: true });
        return { newRequestor, newReciever };
    }
    async cancelFriendRequest({ cancelerId, cancelingId }) {
        const canceler = await this.userModel.findById(cancelerId);
        const canceling = await this.userModel.findById(cancelingId);
        if (!canceler || !canceling) {
            throw new common_1.BadRequestException(`${cancelerId} or/and ${cancelingId} is not a member of social network`);
        }
        const cancelerIsFollowingCancelling = canceler.following.includes(cancelingId) &&
            canceling.followers.includes(cancelerId);
        console.log({ cancelerIsFollowingCancelling });
        if (!cancelerIsFollowingCancelling) {
            throw new common_1.BadRequestException(`Cancelor is NOT following canceling`);
        }
        const newCanceler = await this.userModel.findByIdAndUpdate(cancelerId, {
            $pull: { following: cancelingId },
        }, { new: true });
        const newCanceling = await this.userModel.findByIdAndUpdate(cancelingId, {
            $pull: { followers: cancelerId },
        }, { new: true });
        return { newCanceler, newCanceling };
    }
    async declineFriendRequest({ declinerId, requestorId }) {
        const decliner = await this.userModel.findById(declinerId);
        const requestor = await this.userModel.findById(requestorId);
        if (!decliner || !requestor) {
            throw new common_1.BadRequestException(`${declinerId} or/and ${requestorId} is not a member of social network`);
        }
        const requestorIsFollowingDecliner = requestor.following.includes(declinerId) &&
            decliner.followers.includes(requestorId);
        console.log({ requestorIsFollowingDecliner });
        if (!requestorIsFollowingDecliner) {
            throw new common_1.BadRequestException(`Requestor is NOT following decliner`);
        }
        const newDecliner = await this.userModel.findByIdAndUpdate(declinerId, {
            $pull: { followers: requestorId },
        }, { new: true });
        const newRequestor = await this.userModel.findByIdAndUpdate(requestorId, {
            $pull: { following: declinerId },
        }, { new: true });
        return { newDecliner, newRequestor };
    }
    async friendConfirm({ requestorId, confirmerId }) {
        const requestor = await this.userModel.findById(requestorId);
        const confirmer = await this.userModel.findById(confirmerId);
        if (!requestor || !confirmer) {
            throw new common_1.BadRequestException(`${requestorId} or/and ${confirmerId} is not a member of social network`);
        }
        const requestorIsFollowingConfirmer = confirmer.followers.includes(requestorId) &&
            requestor.following.includes(confirmerId);
        if (!requestorIsFollowingConfirmer) {
            throw new common_1.BadRequestException(`Requestor is NOT following confirmer`);
        }
        const confirmerIsFollowingRequestor = confirmer.following.includes(requestorId) &&
            requestor.followers.includes(confirmerId);
        if (confirmerIsFollowingRequestor) {
            throw new common_1.BadRequestException(`Confirmer is following requestor. Please, send /friendConfirm from requestor`);
        }
        const requestorAlreadyFriendsWithConfirmer = confirmer.friends.includes(requestorId) &&
            requestor.friends.includes(confirmerId);
        if (requestorAlreadyFriendsWithConfirmer) {
            throw new common_1.BadRequestException(`Requestor is already friends with confirmer`);
        }
        console.log({ requestorIsFollowingConfirmer });
        console.log({ confirmerIsFollowingRequestor });
        console.log({ requestorAlreadyFriendsWithConfirmer });
        const newRequestor = await this.userModel.findByIdAndUpdate(requestorId, {
            $pull: { following: confirmerId },
            $push: { friends: confirmerId },
        }, { new: true });
        const newConfirmer = await this.userModel.findByIdAndUpdate(confirmerId, {
            $pull: { followers: requestorId },
            $push: { friends: requestorId },
        }, { new: true });
        return { newRequestor, newConfirmer };
    }
    async removeFriend({ removerId, removingId }) {
        const remover = await this.userModel.findById(removerId);
        const removing = await this.userModel.findById(removingId);
        if (!remover || !removing) {
            throw new common_1.BadRequestException(`${removerId} or/and ${removingId} is not a member of social network`);
        }
        const removerIsFriendsWithRemoving = remover.friends.includes(removingId) &&
            removing.friends.includes(removerId);
        if (!removerIsFriendsWithRemoving) {
            throw new common_1.BadRequestException(`Remover and Removing are NOT friends`);
        }
        console.log({ removerIsFriendsWithRemoving });
        const newRemover = await this.userModel.findByIdAndUpdate(removerId, {
            $pull: { friends: removingId },
            $push: { followers: removingId },
        }, { new: true });
        const newRemoving = await this.userModel.findByIdAndUpdate(removingId, {
            $pull: { friends: removerId },
            $push: { following: removerId },
        }, { new: true });
        return { newRemover, newRemoving };
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map