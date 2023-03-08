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
exports.UpdateUserInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const location_dto_1 = require("./location.dto");
const user_info_links_dto_1 = require("./user-info-links.dto");
class UpdateUserInfoDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'BSTU "Voenmeh" in honor of Ustinov',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Wolf is weaker than lion, however does not perfomance in circus. auf...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+79215350981',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '01.01.1999',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateUserInfoDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({}),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => location_dto_1.LocationDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", location_dto_1.LocationDto)
], UpdateUserInfoDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({}),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => user_info_links_dto_1.LinksDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", user_info_links_dto_1.LinksDto)
], UpdateUserInfoDto.prototype, "links", void 0);
exports.UpdateUserInfoDto = UpdateUserInfoDto;
//# sourceMappingURL=update-user-info.dto.js.map