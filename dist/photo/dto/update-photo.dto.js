"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const new_photo_dto_1 = require("./new-photo.dto");
class UpdatePhotoDto extends (0, swagger_1.PartialType)(new_photo_dto_1.NewPhotoDto) {
}
exports.UpdatePhotoDto = UpdatePhotoDto;
//# sourceMappingURL=update-photo.dto.js.map