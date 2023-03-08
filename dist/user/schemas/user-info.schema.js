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
exports.UserInfoSchema = exports.UserInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const location_schema_1 = require("./location.schema");
const user_links_schema_1 = require("./user-links.schema");
let UserInfo = class UserInfo {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: user_links_schema_1.UserLinks,
        default: {},
    }),
    __metadata("design:type", user_links_schema_1.UserLinks)
], UserInfo.prototype, "links", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "education", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: '',
    }),
    __metadata("design:type", Date)
], UserInfo.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: location_schema_1.LocationSchema,
        default: {
            city: '',
            country: '',
            coordinates: {
                x: '',
                y: '',
            },
        },
    }),
    __metadata("design:type", location_schema_1.Location)
], UserInfo.prototype, "location", void 0);
UserInfo = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UserInfo);
exports.UserInfo = UserInfo;
exports.UserInfoSchema = mongoose_1.SchemaFactory.createForClass(UserInfo);
//# sourceMappingURL=user-info.schema.js.map