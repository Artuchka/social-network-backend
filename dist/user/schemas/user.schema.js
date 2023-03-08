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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_enum_1 = require("../enums/role.enum");
const gender_enum_1 = require("../enums/gender.enum");
const user_entries_schema_1 = require("../../schemas/user-entries.schema");
const user_info_schema_1 = require("./user-info.schema");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: role_enum_1.Role,
        default: role_enum_1.Role.USER,
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: gender_enum_1.Gender,
        default: gender_enum_1.Gender.Male,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Photo',
        default: null,
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: user_info_schema_1.UserInfo,
        default: {},
    }),
    __metadata("design:type", user_info_schema_1.UserInfo)
], User.prototype, "info", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: user_entries_schema_1.UserEntries,
        default: {
            posts: [],
            comments: [],
            photos: [],
        },
    }),
    __metadata("design:type", user_entries_schema_1.UserEntries)
], User.prototype, "entries", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: user_entries_schema_1.UserEntries,
        default: {
            posts: [],
            comments: [],
            photos: [],
        },
    }),
    __metadata("design:type", user_entries_schema_1.UserEntries)
], User.prototype, "likes", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true } })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('id').get(function () {
    return this._id;
});
exports.UserSchema.virtual('fullname').get(function () {
    return `${this.firstname || ''} ${this.lastname || ''}`.trim();
});
//# sourceMappingURL=user.schema.js.map