import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { Entry } from '../schemas/entry.schema'
import { Content } from '../schemas/content.schema'

export type PostDocument = HydratedDocument<Post>

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Post extends Entry {
  @Prop({ type: Content, required: true })
  content: Content

  likes: number
  dislikes: number
}

export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.virtual('likes').get(function (this: PostDocument) {
  return this.liked.length
})
PostSchema.virtual('dislikes').get(function (this: PostDocument) {
  return this.disliked.length
})
