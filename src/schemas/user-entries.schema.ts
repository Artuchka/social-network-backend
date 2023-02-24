import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Post } from '../post/post.schema'
import { Comment } from '../comment/comment.schema'
import { Photo } from '../photo/photo.schema'

export type UserEntriesDocument = HydratedDocument<UserEntries>

@Schema({ _id: false })
export class UserEntries {
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    default: [],
  })
  posts: Post[]

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    default: [],
  })
  comments: Comment[]

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
    default: [],
  })
  photos: Photo[]
}

export const UserEntriesSchema = SchemaFactory.createForClass(UserEntries)
