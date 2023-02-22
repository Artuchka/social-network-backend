import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

// export interface IUserDocuemnt extends User, Document {}
// export type UserDocument = HydratedDocument<User>
export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Prop({
    type: String,
    default: '',
  })
  firstname: string

  @Prop({
    type: String,
    default: '',
  })
  lastname: string

  @Prop({
    type: String,
    default: '',
  })
  username: string
}

export const UserSchema = SchemaFactory.createForClass(User)
