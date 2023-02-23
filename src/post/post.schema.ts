import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { User } from 'src/user/user.schema'

export type PostDocument = HydratedDocument<Post>

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  authorId: User

  @Prop({
    type: String,
    required: true,
    maxlength: 1500,
  })
  text: string

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  liked: User[]

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  disliked: User[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
