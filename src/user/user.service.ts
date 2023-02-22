import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { UserDocument } from './user.schema'
import { UserDetails } from './user-details.interface'
import { NewUserDto } from './dto/new-user.dto'

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
    }
  }

  async create(dto: NewUserDto): Promise<UserDetails> {
    const { email, password } = dto

    const user = await this.userModel.create({ email, password })
    return this._getUserDetails(user)
  }

  async getSingleById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id)
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

  async dropDB(colName: string): Promise<any> {
    console.log({ colName })

    switch (colName.toLowerCase()) {
      case 'user':
        return this.userModel.db.dropCollection('users', errCallback)
    }
  }
}

function errCallback(err) {
  if (err) return console.log(err)

  console.log('delete collection')
}
