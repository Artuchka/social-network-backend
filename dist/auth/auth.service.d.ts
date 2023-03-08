import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from '../user/services/user.service';
import { NewUserDto } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDto } from '../user/dto/existing-user.dto';
import { UserDocument } from '../user/schemas/user.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    hashPassword(password: string): Promise<any>;
    register(dto: NewUserDto): Promise<UserDetails>;
    isValidPassword(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<{
        userDetails: any;
        user: any;
    }>;
    login(tryingUser: ExistingUserDto): Promise<{
        user: UserDocument;
        token: string;
    }>;
    logout(res: Response): Promise<{
        token: string;
    } | null>;
    setCookie(res: Response, token: string): Promise<{
        token: string;
    } | null>;
}
