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
exports.AdditionalPostInfo = exports.NewCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const new_content_dto_1 = require("../../dto/new-content.dto");
const source_type_enum_1 = require("../source-type.enum");
class NewCommentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '63f76752d0312909501ead39',
        description: 'id of closest parent comment',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewCommentDto.prototype, "reply", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '63f76752d0312909501ead39',
        description: 'source id corresponding either to Post or Photo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], NewCommentDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '63f76752d0312909501ead39',
        description: 'post source type id',
        enum: source_type_enum_1.SourceType,
    }),
    (0, class_validator_1.IsEnum)(source_type_enum_1.SourceType, { each: true }),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], NewCommentDto.prototype, "sourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'contents of comment',
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => new_content_dto_1.NewContentDto),
    __metadata("design:type", new_content_dto_1.NewContentDto)
], NewCommentDto.prototype, "content", void 0);
exports.NewCommentDto = NewCommentDto;
class AdditionalPostInfo {
}
exports.AdditionalPostInfo = AdditionalPostInfo;
//# sourceMappingURL=new-comment.dto.js.map