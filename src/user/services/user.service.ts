import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { User, UserDocument } from '../schemas/user.schema'
import { UserDetails } from '../user-details.interface'
import { NewUserDto } from '../dto/new-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import * as merge from 'lodash.merge'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    }
  }

  _pickUser(user: UserDocument) {
    const { _id, firstname, lastname, username, gender, avatar, roles } = user
    return {
      id: _id.toString(),
      firstname,
      lastname,
      username,
      gender,
      avatar: { id: avatar.id, path: avatar.path },
      roles,
    }
  }

  async create(dto: NewUserDto): Promise<UserDetails> {
    const { email, password } = dto

    const user = await this.userModel.create({ email, password })
    return this._getUserDetails(user)
  }

  async getSingleById(
    id: string,
  ): Promise<ReturnType<UserService['_pickUser']>> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'avatar', select: 'path' })

    const pickedUser = this._pickUser(user)

    return pickedUser
  }

  async getSingleByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ email })
      .populate({ path: 'avatar', select: 'path' })

    return user
  }

  async getAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find().select('-password')

    return users
  }

  async deleteSingle(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user
  }

  async updateSingle(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    console.log({ dto })

    const foundUser = await this.userModel.findById(id)

    if (!foundUser) {
      throw new NotFoundException(`No user with id ${id}`)
    }

    merge(foundUser, dto)
    await foundUser.save()

    return foundUser
  }

  async dropDB(colName: string): Promise<any> {
    console.log({ dropping: colName })

    switch (colName.toLowerCase()) {
      case 'user':
        return this.userModel.db.dropCollection('users', errCallback)
      case 'post':
        return this.userModel.db.dropCollection('posts', errCallback)
      case 'comment':
        return this.userModel.db.dropCollection('comments', errCallback)
      case 'photo':
        return this.userModel.db.dropCollection('photos', errCallback)
    }
  }
}

function errCallback(err) {
  if (err) return console.log(err)

  console.log('delete collection')
}
