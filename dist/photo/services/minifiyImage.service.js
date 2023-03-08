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
exports.MinifyImageService = void 0;
const common_1 = require("@nestjs/common");
async function main() {
    ;
    ('/home/temka/user_files/proga/training/nestjs_training/node_modules/imagemin/index.js');
}
main();
let MinifyImageService = class MinifyImageService {
    constructor() { }
    async minifyImage(image) {
        const imageminOption = { plugins: [] };
        const buffer = image === null || image === void 0 ? void 0 : image.buffer;
        const ext = image === null || image === void 0 ? void 0 : image.mimetype.split('/')[1];
        if (!buffer || !ext) {
            return null;
        }
        const minifiedBuffer = buffer;
        const saved = (((buffer.length - minifiedBuffer.length) / buffer.length) *
            100).toFixed(2);
        const bytesSaved = buffer.length - minifiedBuffer.length;
        console.log(`initial = ${buffer.length}`);
        console.log(`minified =  ${minifiedBuffer.length}`);
        console.log(`saved = ${saved}`);
        return { minifiedBuffer, bytesSaved };
    }
};
MinifyImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MinifyImageService);
exports.MinifyImageService = MinifyImageService;
//# sourceMappingURL=minifiyImage.service.js.map