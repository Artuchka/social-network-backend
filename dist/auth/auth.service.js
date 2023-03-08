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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/services/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async register(dto) {
        const { email, password } = dto;
        const existingUser = await this.userService.getSingleByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('there is already a user with that email');
        }
        const hashed = await this.hashPassword(password);
        return this.userService.create({ email, password: hashed });
    }
    async isValidPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async validateUser(email, password) {
        const user = await this.userService.getSingleByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('no such user with email: ' + email);
        }
        const isPassValid = await this.isValidPassword(password, user.password);
        if (!isPassValid) {
            throw new common_1.BadRequestException('bad password');
        }
        delete user.password;
        const userDetails = this.userService._getUserDetails(user);
        return { userDetails, user };
    }
    async login(tryingUser) {
        const { email, password } = tryingUser;
        const { user, userDetails } = await this.validateUser(email, password);
        const token = await this.jwtService.signAsync({
            user: userDetails,
        });
        return { user, token };
    }
    async logout(res) {
        res.clearCookie('accessToken');
        return { token: null };
    }
    async setCookie(res, token) {
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie('accessToken', token, {
            expires: new Date(Date.now() + oneDay),
            httpOnly: false,
            secure: true,
            sameSite: 'none',
        });
        return { token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map