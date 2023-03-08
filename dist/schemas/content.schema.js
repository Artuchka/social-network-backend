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
exports.ContentSchema = exports.Content = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Content = class Content {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1500,
        default: '',
    }),
    __metadata("design:type", String)
], Content.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Photo' }],
        default: [],
    }),
    __metadata("design:type", Array)
], Content.prototype, "images", void 0);
Content = __decorate([
    (0, mongoose_1.Schema)({ timestamps: { updatedAt: true, createdAt: false } })
], Content);
exports.Content = Content;
exports.ContentSchema = mongoose_1.SchemaFactory.createForClass(Content);
//# sourceMappingURL=content.schema.js.map