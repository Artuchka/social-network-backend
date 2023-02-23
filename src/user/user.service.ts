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
import { User, UserDocument } from './user.schema'
import { UserDetails } from './user-details.interface'
import { NewUserDto } from './dto/new-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

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

  async create(dto: NewUserDto): Promise<UserDetails> {
    const { email, password } = dto

    const user = await this.userModel.create({ email, password })
    return this._getUserDetails(user)
  }

  async getSingleById(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'posts', select: 'text likesAmount' })
    return user
  }

  async getSingleByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email })
    return user
  }

  async getAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find()
    return users
  }

  async deleteSingle(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user
  }

  async updateSingle(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    const foundUser = await this.userModel.findById(id)

    if (!foundUser) {
      throw new NotFoundException(`No user with id ${id}`)
    }

    const allowed = [
      'username',
      'firstname',
      'lastname',
      'phone',
      'gender',
      'birthday',
      'location',
      'email',
      'avatar',
    ]

    Object.keys(dto).forEach((key) => {
      if (!allowed.includes(key)) {
        throw new ForbiddenException(
          `😡Запрещенно обновлять поле \`${key}\` у пользователя😡`,
        )
      }

      foundUser[key] = dto[key]
    })
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
    }
  }

  async addPost({ postId, authorId }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $push: { posts: postId },
      },
      {
        upsert: true,
        new: true,
      },
    )
  }
}

function errCallback(err) {
  if (err) return console.log(err)

  console.log('delete collection')
}
