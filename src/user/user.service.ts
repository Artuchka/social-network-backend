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
import { User, UserDocument } from './schemas/user.schema'
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
      .populate({ path: 'posts', select: 'text liked disliked' })
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

      if (key === 'location') {
        Object.keys(dto[key]).forEach((subkey) => {
          foundUser[key][subkey] = dto[key][subkey]
        })
      } else {
        foundUser[key] = dto[key]
      }
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

  async removePost({ postId, authorId }) {
    const user = await this.userModel.findByIdAndUpdate(
      authorId,
      {
        $pull: { posts: postId },
      },
      { new: true },
    )
  }

  async friendRequest({ requestorId, recieverId }) {
    const requestor = await this.userModel.findById(requestorId)
    const reciever = await this.userModel.findById(recieverId)

    if (!requestor || !reciever) {
      throw new BadRequestException(
        `${requestorId} or/and ${recieverId} is not a member of social network`,
      )
    }

    const requestorAlreadyFollowingReciever =
      reciever.followers.includes(requestorId) &&
      requestor.following.includes(recieverId)
    if (requestorAlreadyFollowingReciever) {
      throw new BadRequestException(`Requestor is already following reciever`)
    }

    const recieverAlreadyFollowingRequestor =
      reciever.following.includes(requestorId) &&
      requestor.followers.includes(recieverId)
    if (recieverAlreadyFollowingRequestor) {
      throw new BadRequestException(
        `Reciever is already following requestor. Please, send /friendConfirm from requestor`,
      )
    }

    const requestorAlreadyFriendsWithReciever =
      reciever.friends.includes(requestorId) &&
      requestor.friends.includes(recieverId)
    if (requestorAlreadyFriendsWithReciever) {
      throw new BadRequestException(
        `Requestor is already friends with reciever`,
      )
    }

    console.log({ requestorAlreadyFollowingReciever })
    console.log({ recieverAlreadyFollowingRequestor })
    console.log({ requestorAlreadyFriendsWithReciever })

    const newRequestor = await this.userModel.findByIdAndUpdate(
      requestorId,
      {
        $push: { following: recieverId },
      },
      { new: true },
    )
    const newReciever = await this.userModel.findByIdAndUpdate(
      recieverId,
      {
        $push: { followers: requestorId },
      },
      { new: true },
    )

    return { newRequestor, newReciever }
  }

  async cancelFriendRequest({ cancelerId, cancelingId }) {
    const canceler = await this.userModel.findById(cancelerId)
    const canceling = await this.userModel.findById(cancelingId)

    if (!canceler || !canceling) {
      throw new BadRequestException(
        `${cancelerId} or/and ${cancelingId} is not a member of social network`,
      )
    }

    const cancelerIsFollowingCancelling =
      canceler.following.includes(cancelingId) &&
      canceling.followers.includes(cancelerId)

    console.log({ cancelerIsFollowingCancelling })

    if (!cancelerIsFollowingCancelling) {
      throw new BadRequestException(`Cancelor is NOT following canceling`)
    }

    const newCanceler = await this.userModel.findByIdAndUpdate(
      cancelerId,
      {
        $pull: { following: cancelingId },
      },
      { new: true },
    )
    const newCanceling = await this.userModel.findByIdAndUpdate(
      cancelingId,
      {
        $pull: { followers: cancelerId },
      },
      { new: true },
    )

    return { newCanceler, newCanceling }
  }

  async declineFriendRequest({ declinerId, requestorId }) {
    const decliner = await this.userModel.findById(declinerId)
    const requestor = await this.userModel.findById(requestorId)

    if (!decliner || !requestor) {
      throw new BadRequestException(
        `${declinerId} or/and ${requestorId} is not a member of social network`,
      )
    }

    const requestorIsFollowingDecliner =
      requestor.following.includes(declinerId) &&
      decliner.followers.includes(requestorId)

    console.log({ requestorIsFollowingDecliner })

    if (!requestorIsFollowingDecliner) {
      throw new BadRequestException(`Requestor is NOT following decliner`)
    }

    const newDecliner = await this.userModel.findByIdAndUpdate(
      declinerId,
      {
        $pull: { followers: requestorId },
      },
      { new: true },
    )
    const newRequestor = await this.userModel.findByIdAndUpdate(
      requestorId,
      {
        $pull: { following: declinerId },
      },
      { new: true },
    )

    return { newDecliner, newRequestor }
  }

  async friendConfirm({ requestorId, confirmerId }) {
    const requestor = await this.userModel.findById(requestorId)
    const confirmer = await this.userModel.findById(confirmerId)

    if (!requestor || !confirmer) {
      throw new BadRequestException(
        `${requestorId} or/and ${confirmerId} is not a member of social network`,
      )
    }

    const requestorIsFollowingConfirmer =
      confirmer.followers.includes(requestorId) &&
      requestor.following.includes(confirmerId)
    if (!requestorIsFollowingConfirmer) {
      throw new BadRequestException(`Requestor is NOT following confirmer`)
    }

    const confirmerIsFollowingRequestor =
      confirmer.following.includes(requestorId) &&
      requestor.followers.includes(confirmerId)
    if (confirmerIsFollowingRequestor) {
      throw new BadRequestException(
        `Confirmer is following requestor. Please, send /friendConfirm from requestor`,
      )
    }

    const requestorAlreadyFriendsWithConfirmer =
      confirmer.friends.includes(requestorId) &&
      requestor.friends.includes(confirmerId)
    if (requestorAlreadyFriendsWithConfirmer) {
      throw new BadRequestException(
        `Requestor is already friends with confirmer`,
      )
    }

    console.log({ requestorIsFollowingConfirmer })
    console.log({ confirmerIsFollowingRequestor })
    console.log({ requestorAlreadyFriendsWithConfirmer })

    const newRequestor = await this.userModel.findByIdAndUpdate(
      requestorId,
      {
        $pull: { following: confirmerId },
        $push: { friends: confirmerId },
      },
      { new: true },
    )
    const newConfirmer = await this.userModel.findByIdAndUpdate(
      confirmerId,
      {
        $pull: { followers: requestorId },
        $push: { friends: requestorId },
      },
      { new: true },
    )
    return { newRequestor, newConfirmer }
  }

  async removeFriend({ removerId, removingId }) {
    const remover = await this.userModel.findById(removerId)
    const removing = await this.userModel.findById(removingId)

    if (!remover || !removing) {
      throw new BadRequestException(
        `${removerId} or/and ${removingId} is not a member of social network`,
      )
    }

    const removerIsFriendsWithRemoving =
      remover.friends.includes(removingId) &&
      removing.friends.includes(removerId)
    if (!removerIsFriendsWithRemoving) {
      throw new BadRequestException(`Remover and Removing are NOT friends`)
    }

    console.log({ removerIsFriendsWithRemoving })

    const newRemover = await this.userModel.findByIdAndUpdate(
      removerId,
      {
        $pull: { friends: removingId },
        $push: { followers: removingId },
      },
      { new: true },
    )
    const newRemoving = await this.userModel.findByIdAndUpdate(
      removingId,
      {
        $pull: { friends: removerId },
        $push: { following: removerId },
      },
      { new: true },
    )
    return { newRemover, newRemoving }
  }
}

function errCallback(err) {
  if (err) return console.log(err)

  console.log('delete collection')
}
