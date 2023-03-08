"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const additional_user_info_dto_1 = require("./additional-user-info.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.IntersectionType)(additional_user_info_dto_1.AdditionalUserInfo)) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map