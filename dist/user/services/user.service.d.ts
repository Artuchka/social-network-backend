import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { UserDetails } from '../user-details.interface';
import { NewUserDto } from '../dto/new-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _getUserDetails(user: UserDocument): UserDetails;
    create(dto: NewUserDto): Promise<UserDetails>;
    getSingleById(id: string): Promise<UserDocument>;
    getSingleByEmail(email: string): Promise<UserDocument>;
    getAll(): Promise<UserDocument[]>;
    deleteSingle(id: string): Promise<UserDocument>;
    updateSingle(id: string, dto: UpdateUserDto): Promise<UserDocument>;
    dropDB(colName: string): Promise<any>;
}
