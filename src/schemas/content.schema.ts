import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Photo } from '../photo/photo.schema'
import mongoose from 'mongoose'

@Schema()
export class Content {
  @Prop({
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1500,
    default: '',
  })
  text: string

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
    default: [],
  })
  images: Photo
}

export const ContentSchema = SchemaFactory.createForClass(Content)
