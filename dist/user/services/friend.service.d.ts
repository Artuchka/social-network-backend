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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class FriendService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    friendRequest({ requestorId, recieverId }: {
        requestorId: any;
        recieverId: any;
    }): Promise<{
        newRequestor: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newReciever: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    cancelFriendRequest({ cancelerId, cancelingId }: {
        cancelerId: any;
        cancelingId: any;
    }): Promise<{
        newCanceler: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newCanceling: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    declineFriendRequest({ declinerId, requestorId }: {
        declinerId: any;
        requestorId: any;
    }): Promise<{
        newDecliner: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRequestor: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    friendConfirm({ requestorId, confirmerId }: {
        requestorId: any;
        confirmerId: any;
    }): Promise<{
        newRequestor: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newConfirmer: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    removeFriend({ removerId, removingId }: {
        removerId: any;
        removingId: any;
    }): Promise<{
        newRemover: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        newRemoving: import("mongoose").Document<unknown, any, import("../schemas/user.schema").User> & import("../schemas/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
