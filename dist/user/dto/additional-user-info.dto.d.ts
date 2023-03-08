import { Gender } from '../enums/gender.enum';
import { UpdateUserInfoDto } from './update-user-info.dto';
export declare class AdditionalUserInfo {
    firstname: string;
    lastname: string;
    username: string;
    gender: Gender;
    avatar: string;
    info: UpdateUserInfoDto;
}
