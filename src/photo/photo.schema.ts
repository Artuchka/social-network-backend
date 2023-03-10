import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Entry } from '../schemas/entry.schema'
import { Content } from '../schemas/content.schema'
import { Post } from '../post/post.schema'

export type PhotoDocument = HydratedDocument<Photo>

@Schema({ toJSON: { virtuals: true }, id: true })
export class Photo extends Entry {
  @Prop({
    type: String,
    required: true,
    // default:
    //   'https://res.cloudinary.com/dzy8xh83i/image/upload/v1678463424/zavod-defaults/defualt-user-avatar_mztqfc.jpg',
  })
  path: string

  likes: number
  dislikes: number
  id: string
}

export const PhotoSchema = SchemaFactory.createForClass(Photo)

PhotoSchema.virtual('likes').get(function (this: PhotoDocument) {
  return this?.liked?.length
})
PhotoSchema.virtual('dislikes').get(function (this: PhotoDocument) {
  return this?.disliked?.length
})
