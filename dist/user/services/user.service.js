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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const merge = require("lodash.merge");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    _getUserDetails(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles,
        };
    }
    async create(dto) {
        const { email, password } = dto;
        const user = await this.userModel.create({ email, password });
        return this._getUserDetails(user);
    }
    async getSingleById(id) {
        const user = await this.userModel.findById(id).select('-password');
        return user;
    }
    async getSingleByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async getAll() {
        const users = await this.userModel.find().select('-password');
        return users;
    }
    async deleteSingle(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        return user;
    }
    async updateSingle(id, dto) {
        console.log({ dto });
        const foundUser = await this.userModel.findById(id);
        if (!foundUser) {
            throw new common_1.NotFoundException(`No user with id ${id}`);
        }
        merge(foundUser, dto);
        await foundUser.save();
        return foundUser;
    }
    async dropDB(colName) {
        console.log({ dropping: colName });
        switch (colName.toLowerCase()) {
            case 'user':
                return this.userModel.db.dropCollection('users', errCallback);
            case 'post':
                return this.userModel.db.dropCollection('posts', errCallback);
            case 'comment':
                return this.userModel.db.dropCollection('comments', errCallback);
            case 'photo':
                return this.userModel.db.dropCollection('photos', errCallback);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
function errCallback(err) {
    if (err)
        return console.log(err);
    console.log('delete collection');
}
//# sourceMappingURL=user.service.js.map