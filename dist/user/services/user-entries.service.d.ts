import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class UserEntriesService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _addPost({ postId, authorId }: {
        postId: any;
        authorId: any;
    }): Promise<void>;
    _removePost({ postId, authorId }: {
        postId: any;
        authorId: any;
    }): Promise<void>;
    _addComment({ commentId, authorId }: {
        commentId: any;
        authorId: any;
    }): Promise<void>;
    _removeComment({ commentId, authorId }: {
        commentId: any;
        authorId: any;
    }): Promise<void>;
    _addPhoto({ photoId, authorId }: {
        photoId: any;
        authorId: any;
    }): Promise<void>;
    _removePhoto({ photoId, authorId }: {
        photoId: any;
        authorId: any;
    }): Promise<void>;
    _entryAdder({ entryId, authorId, entryName }: {
        entryId: any;
        authorId: any;
        entryName: any;
    }): Promise<void>;
    _entryRemover({ entryId, authorId, entryName }: {
        entryId: any;
        authorId: any;
        entryName: any;
    }): Promise<void>;
    _addLikeOnPost({ postId, authorId }: {
        postId: any;
        authorId: any;
    }): Promise<void>;
    _removeLikeOnPost({ postId, authorId }: {
        postId: any;
        authorId: any;
    }): Promise<void>;
    _addLikeOnComment({ commentId, authorId }: {
        commentId: any;
        authorId: any;
    }): Promise<void>;
    _removeLikeOnComment({ commentId, authorId }: {
        commentId: any;
        authorId: any;
    }): Promise<void>;
    _addLikeOnPhoto({ photoId, authorId }: {
        photoId: any;
        authorId: any;
    }): Promise<void>;
    _removeLikeOnPhoto({ photoId, authorId }: {
        photoId: any;
        authorId: any;
    }): Promise<void>;
    _entryLikesAdder({ entryId, authorId, entryName }: {
        entryId: any;
        authorId: any;
        entryName: any;
    }): Promise<void>;
    _entryLikesRemover({ entryId, authorId, entryName }: {
        entryId: any;
        authorId: any;
        entryName: any;
    }): Promise<void>;
}
