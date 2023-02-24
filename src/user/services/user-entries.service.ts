import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from '../schemas/user.schema'

@Injectable()
export class UserEntriesService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async _addPost({ postId, authorId }) {
    this._entryAdder({ entryId: postId, authorId, entryName: 'posts' })
  }

  async _removePost({ postId, authorId }) {
    this._entryRemover({ entryId: postId, authorId, entryName: 'posts' })
  }

  async _addComment({ commentId, authorId }) {
    this._entryAdder({ entryId: commentId, authorId, entryName: 'comments' })
  }

  async _removeComment({ commentId, authorId }) {
    this._entryRemover({ entryId: commentId, authorId, entryName: 'comments' })
  }

  async _addPhoto({ photoId, authorId }) {
    this._entryAdder({ entryId: photoId, authorId, entryName: 'photos' })
  }

  async _removePhoto({ photoId, authorId }) {
    this._entryRemover({ entryId: photoId, authorId, entryName: 'photos' })
  }

  async _entryAdder({ entryId, authorId, entryName }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $push: { [`entries.${entryName}`]: entryId },
      },
      {
        upsert: true,
        new: true,
      },
    )
  }

  async _entryRemover({ entryId, authorId, entryName }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $pull: { [`entries.${entryName}`]: entryId },
      },
      { new: true },
    )
  }

  async _addLikeOnPost({ postId, authorId }) {
    this._entryLikesAdder({ entryId: postId, authorId, entryName: 'posts' })
  }

  async _removeLikeOnPost({ postId, authorId }) {
    this._entryLikesRemover({ entryId: postId, authorId, entryName: 'posts' })
  }

  async _addLikeOnComment({ commentId, authorId }) {
    this._entryLikesAdder({
      entryId: commentId,
      authorId,
      entryName: 'comments',
    })
  }

  async _removeLikeOnComment({ commentId, authorId }) {
    this._entryLikesRemover({
      entryId: commentId,
      authorId,
      entryName: 'comments',
    })
  }

  async _addLikeOnPhoto({ photoId, authorId }) {
    this._entryLikesAdder({ entryId: photoId, authorId, entryName: 'photos' })
  }

  async _removeLikeOnPhoto({ photoId, authorId }) {
    this._entryLikesRemover({ entryId: photoId, authorId, entryName: 'photos' })
  }

  async _entryLikesAdder({ entryId, authorId, entryName }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $push: { [`likes.${entryName}`]: entryId },
      },
      {
        upsert: true,
        new: true,
      },
    )
  }

  async _entryLikesRemover({ entryId, authorId, entryName }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $pull: { [`likes.${entryName}`]: entryId },
      },
      { new: true },
    )
  }
}
