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
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const entry_schema_1 = require("../schemas/entry.schema");
const content_schema_1 = require("../schemas/content.schema");
let Comment = class Comment extends entry_schema_1.Entry {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['Post', 'Photo'],
        required: true,
    }),
    __metadata("design:type", String)
], Comment.prototype, "sourceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        refPath: 'sourceType',
        required: true,
    }),
    __metadata("design:type", Object)
], Comment.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Comment',
    }),
    __metadata("design:type", Comment)
], Comment.prototype, "reply", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: content_schema_1.Content }),
    __metadata("design:type", content_schema_1.Content)
], Comment.prototype, "content", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true } })
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
exports.CommentSchema.virtual('likes').get(function () {
    return this.liked.length;
});
exports.CommentSchema.virtual('dislikes').get(function () {
    return this.disliked.length;
});
//# sourceMappingURL=comment.schema.js.map