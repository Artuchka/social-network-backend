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
exports.PhotoSchema = exports.Photo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const entry_schema_1 = require("../schemas/entry.schema");
let Photo = class Photo extends entry_schema_1.Entry {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Photo.prototype, "path", void 0);
Photo = __decorate([
    (0, mongoose_1.Schema)({ toJSON: { virtuals: true } })
], Photo);
exports.Photo = Photo;
exports.PhotoSchema = mongoose_1.SchemaFactory.createForClass(Photo);
exports.PhotoSchema.virtual('likes').get(function () {
    return this.liked.length;
});
exports.PhotoSchema.virtual('dislikes').get(function () {
    return this.disliked.length;
});
//# sourceMappingURL=photo.schema.js.map