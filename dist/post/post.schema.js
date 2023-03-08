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
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const entry_schema_1 = require("../schemas/entry.schema");
const content_schema_1 = require("../schemas/content.schema");
let Post = class Post extends entry_schema_1.Entry {
};
__decorate([
    (0, mongoose_1.Prop)({ type: content_schema_1.Content, required: true }),
    __metadata("design:type", content_schema_1.Content)
], Post.prototype, "content", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true } })
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
exports.PostSchema.virtual('likes').get(function () {
    return this.liked.length;
});
exports.PostSchema.virtual('dislikes').get(function () {
    return this.disliked.length;
});
//# sourceMappingURL=post.schema.js.map