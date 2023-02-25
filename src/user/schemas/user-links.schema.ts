import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserLinksDocument = HydratedDocument<UserLinks>

@Schema({ _id: false })
export class UserLinks {
  @Prop({
    type: String,
    default: '',
  })
  instagram: string

  @Prop({
    type: String,
    default: '',
  })
  twitter: string

  @Prop({
    type: String,
    default: '',
  })
  facebook: string

  @Prop({
    type: String,
    default: '',
  })
  site: string
}

export const UserLinksSchema = SchemaFactory.createForClass(UserLinks)
