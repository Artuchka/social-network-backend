/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './services/user.service';
import { UserDetails } from './user-details.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendService } from './services/friend.service';
export declare class UserController {
    private userService;
    private friendService;
    constructor(userService: UserService, friendService: FriendService);
    getAll(): Promise<{
        message: string;
        users: (import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSingle(id: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    requestFriend(requestorId: string, recieverId: string, currentUserId: string): Promise<{
        message: string;
        newReciever: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRequestor: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    confirmFriend(requestorId: string, confirmerId: string, currentUserId: string): Promise<{
        message: string;
        newConfirmer: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRequestor: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    removeFriend(removerId: string, removingId: string, currentUserId: string): Promise<{
        message: string;
        newRemover: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRemoving: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    cancelFriendRequest(cancelerId: string, cancelingId: string, currentUserId: string): Promise<{
        message: string;
        newCanceler: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newCanceling: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    declineFriendRequest(declinerId: string, requestorId: string, currentUserId: string): Promise<{
        message: string;
        newDecliner: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRequestor: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    dropCollection(colName: string): Promise<any>;
    deleteSingle(id: string): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateSingle(id: string, dto: UpdateUserDto, user: UserDetails): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, any, import("./schemas/user.schema").User> & import("./schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
