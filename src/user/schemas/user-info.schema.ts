import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Coordinates, CoordinatesSchema } from './coordinates.schema'
import { HydratedDocument } from 'mongoose'
import { Location, LocationSchema } from './location.schema'
import { UserLinks } from './user-links.schema'

export type UserInfoDocument = HydratedDocument<UserInfo>

@Schema({ _id: false })
export class UserInfo {
  @Prop({
    type: UserLinks,
    default: {},
  })
  links: UserLinks

  @Prop({
    type: String,
    default: '',
  })
  education: string

  @Prop({
    type: String,
    default: '',
  })
  status: string

  @Prop({
    type: String,
    default: '',
  })
  phone: string

  @Prop({
    type: Date,
    default: '',
  })
  birthday: Date

  @Prop({
    type: LocationSchema,
    default: {
      city: '',
      country: '',
      coordinates: {
        x: '',
        y: '',
      },
    },
  })
  location: Location
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo)
