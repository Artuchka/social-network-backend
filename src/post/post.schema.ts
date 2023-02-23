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
    type: Number,
    default: 0,
  })
  likesAmount: number
}

export const PostSchema = SchemaFactory.createForClass(Post)
