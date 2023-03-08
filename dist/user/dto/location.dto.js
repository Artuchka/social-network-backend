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
exports.LocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CoordinatesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '57.1231',
        description: 'longitude',
    }),
    __metadata("design:type", String)
], CoordinatesDto.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '31.1231',
        description: 'lentitude',
    }),
    __metadata("design:type", String)
], CoordinatesDto.prototype, "y", void 0);
class LocationDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'St. Petersburg',
        description: 'user city',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LocationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Mother Russia',
        description: 'user countru',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LocationDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'precise coordinates',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CoordinatesDto)
], LocationDto.prototype, "coordinates", void 0);
exports.LocationDto = LocationDto;
//# sourceMappingURL=location.dto.js.map