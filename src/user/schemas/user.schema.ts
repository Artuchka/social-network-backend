import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument } from 'mongoose'
import { Role } from '../enums/role.enum'
import { Gender } from '../enums/gender.enum'
import { Post } from 'src/post/post.schema'
import { Location, LocationSchema } from './location.schema'
import { Photo } from '../../photo/photo.schema'
import { UserEntries } from '../../schemas/user-entries.schema'
import { UserInfo } from './user-info.schema'

// export interface UserDocuemnt extends User, Document {}
export type UserDocument = HydratedDocument<User>
// export type UserDocument = User & Document

@Schema({ timestamps: true, toJSON: { virtuals: true } })
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

  @Prop({
    type: [String],
    enum: Role,
    default: Role.USER,
  })
  roles: [Role]

  @Prop({
    type: String,
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    default: '640b5a618689e4fd23e5d90d',
  })
  avatar: Photo

  @Prop({
    type: UserInfo,
    default: {},
  })
  info: UserInfo

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  friends: User[]

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  following: User[]

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  })
  followers: User[]

  @Prop({
    type: UserEntries,
    default: {
      posts: [],
      comments: [],
      photos: [],
    },
  })
  entries: UserEntries

  @Prop({
    type: UserEntries,
    default: {
      posts: [],
      comments: [],
      photos: [],
    },
  })
  likes: UserEntries

  // _id: string
  id: string
  fullname: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id
})

UserSchema.virtual('fullname').get(function (this: UserDocument) {
  return `${this.firstname || ''} ${this.lastname || ''}`.trim()
})
