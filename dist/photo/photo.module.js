"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoModule = void 0;
const common_1 = require("@nestjs/common");
const photo_controller_1 = require("./photo.controller");
const photo_service_1 = require("./services/photo.service");
const mongoose_1 = require("@nestjs/mongoose");
const photo_schema_1 = require("./photo.schema");
const user_module_1 = require("../user/user.module");
const upload_service_1 = require("./services/upload.service");
const minifiyImage_service_1 = require("./services/minifiyImage.service");
let PhotoModule = class PhotoModule {
};
PhotoModule = __decorate([
    (0, common_1.Module)({
        controllers: [photo_controller_1.PhotoController],
        providers: [photo_service_1.PhotoService, upload_service_1.UploadService, minifiyImage_service_1.MinifyImageService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: photo_schema_1.Photo.name, schema: photo_schema_1.PhotoSchema }]),
            user_module_1.UserModule,
        ],
        exports: [photo_service_1.PhotoService],
    })
], PhotoModule);
exports.PhotoModule = PhotoModule;
//# sourceMappingURL=photo.module.js.map