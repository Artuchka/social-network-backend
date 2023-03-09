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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./services/user.service");
const user_decorator_1 = require("./decorators/user.decorator");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const friend_service_1 = require("./services/friend.service");
const role_enum_1 = require("./enums/role.enum");
let UserController = class UserController {
    constructor(userService, friendService) {
        this.userService = userService;
        this.friendService = friendService;
    }
    async testroute() {
        return { message: 'tests good' };
    }
    async getAll() {
        const users = await this.userService.getAll();
        return { message: 'all user', users };
    }
    async getSingle(id) {
        const user = await this.userService.getSingleById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        return { message: 'single user', user };
    }
    async requestFriend(requestorId, recieverId, currentUserId) {
        if (requestorId === recieverId) {
            throw new common_1.ForbiddenException('Please provide varying ids');
        }
        if (currentUserId !== requestorId) {
            throw new common_1.ForbiddenException('You are not logged in as requestor');
        }
        const { newRequestor, newReciever } = await this.friendService.friendRequest({
            requestorId,
            recieverId,
        });
        return { message: 'friend request sent', newReciever, newRequestor };
    }
    async confirmFriend(requestorId, confirmerId, currentUserId) {
        if (requestorId === confirmerId) {
            throw new common_1.ForbiddenException('Please provide varying ids');
        }
        if (currentUserId !== confirmerId) {
            throw new common_1.ForbiddenException('You are not logged in as confirmer');
        }
        const { newRequestor, newConfirmer } = await this.friendService.friendConfirm({
            requestorId,
            confirmerId,
        });
        return { message: 'friend request confirmed', newConfirmer, newRequestor };
    }
    async removeFriend(removerId, removingId, currentUserId) {
        if (removingId === removerId) {
            throw new common_1.ForbiddenException('Please provide varying ids');
        }
        if (currentUserId !== removerId) {
            throw new common_1.ForbiddenException('You are not logged in as remover');
        }
        const { newRemover, newRemoving } = await this.friendService.removeFriend({
            removerId,
            removingId,
        });
        return { message: 'friend removed', newRemover, newRemoving };
    }
    async cancelFriendRequest(cancelerId, cancelingId, currentUserId) {
        if (cancelerId === cancelingId) {
            throw new common_1.ForbiddenException('Please provide varying ids');
        }
        if (currentUserId !== cancelerId) {
            throw new common_1.ForbiddenException('You are not logged in as canceler');
        }
        const { newCanceler, newCanceling } = await this.friendService.cancelFriendRequest({
            cancelerId,
            cancelingId,
        });
        return { message: 'friend request canceled', newCanceler, newCanceling };
    }
    async declineFriendRequest(declinerId, requestorId, currentUserId) {
        if (declinerId === requestorId) {
            throw new common_1.ForbiddenException('Please provide varying ids');
        }
        if (currentUserId !== declinerId) {
            throw new common_1.ForbiddenException('You are not logged in as decliner');
        }
        const { newDecliner, newRequestor } = await this.friendService.declineFriendRequest({
            declinerId,
            requestorId,
        });
        return { message: 'friend request declined', newDecliner, newRequestor };
    }
    dropCollection(colName) {
        return this.userService.dropDB(colName);
    }
    async deleteSingle(id) {
        const user = await this.userService.deleteSingle(id);
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        return { message: 'deleted', user };
    }
    async updateSingle(id, dto, user) {
        console.log({ dto });
        const { id: requestUserId, roles } = user;
        if (requestUserId !== id && !roles.includes(role_enum_1.Role.ADMIN)) {
            throw new common_1.ForbiddenException(`You are not allowed to update this user`);
        }
        const updatedUser = await this.userService.updateSingle(id, dto);
        return { message: 'updated', user: updatedUser };
    }
};
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'test router' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testroute", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Post)('/friendRequest'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Sending friend request from requestor' }),
    __param(0, (0, common_1.Body)('requestorId')),
    __param(1, (0, common_1.Body)('recieverId')),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestFriend", null);
__decorate([
    (0, common_1.Post)('/friendConfirm'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Confirming friend request from reciever' }),
    __param(0, (0, common_1.Body)('requestorId')),
    __param(1, (0, common_1.Body)('confirmerId')),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmFriend", null);
__decorate([
    (0, common_1.Post)('/removeFriend'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Removing friend' }),
    __param(0, (0, common_1.Body)('removerId')),
    __param(1, (0, common_1.Body)('removingId')),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeFriend", null);
__decorate([
    (0, common_1.Post)('/cancelFriendRequest'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Canceling friend request from requestor' }),
    __param(0, (0, common_1.Body)('cancelerId')),
    __param(1, (0, common_1.Body)('cancelingId')),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "cancelFriendRequest", null);
__decorate([
    (0, common_1.Post)('/declineFriendRequest'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Declining friend request from reciever(decliner)' }),
    __param(0, (0, common_1.Body)('declinerId')),
    __param(1, (0, common_1.Body)('requestorId')),
    __param(2, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "declineFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/drop/:name'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "dropCollection", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteSingle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateSingle", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        friend_service_1.FriendService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map