import { LocationDto } from './location.dto';
import { LinksDto } from './user-info-links.dto';
export declare class UpdateUserInfoDto {
    education: string;
    status: string;
    phone: string;
    birthday: Date;
    location: LocationDto;
    links: LinksDto;
}
