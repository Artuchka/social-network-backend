import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Entry } from '../schemas/entry.schema'
import { Content } from '../schemas/content.schema'
import { Post } from '../post/post.schema'
import { Photo } from '../photo/photo.schema'

export type CommentDocument = HydratedDocument<Comment>

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Comment extends Entry {
  @Prop({
    type: String,
    enum: ['Post', 'Photo'],
    required: true,
  })
  sourceType: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'sourceType',
    required: true,
  })
  source: Post | Photo

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  })
  reply: Comment

  @Prop({ type: Content })
  content: Content

  likes: number
  dislikes: number
}

export const CommentSchema = SchemaFactory.createForClass(Comment)

CommentSchema.virtual('likes').get(function (this: CommentDocument) {
  return this.liked.length
})
CommentSchema.virtual('dislikes').get(function (this: CommentDocument) {
  return this.disliked.length
})
