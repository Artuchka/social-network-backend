import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Photo } from '../photo/photo.schema'
import mongoose from 'mongoose'

@Schema({ timestamps: { updatedAt: true, createdAt: false } })
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
  images: Photo[] | string[]
}

export const ContentSchema = SchemaFactory.createForClass(Content)
