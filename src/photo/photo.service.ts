import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PhotoDocument } from './photo.schema'
import { UserService } from '../user/services/user.service'
import mongoose, { Model, ObjectId, SchemaTypes } from 'mongoose'
import { NewPhotoDto } from './dto/new-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel('Photo')
    private readonly photoModel: Model<PhotoDocument>,
    private readonly userService: UserService,
  ) {}

  async getAll() {
    const photos = await this.photoModel.find()

    return photos
  }

  async getSingle(id: string) {
    const photo = await this.photoModel.findById(id)

    return photo
  }

  async create({ author, dto }: { author: string; dto: NewPhotoDto }) {
    console.log({ dto })

    const newPhoto = await this.photoModel.create({ ...dto, author })

    // this.userService.addPhoto({ authorId, PhotoId: newPhoto.id })

    return newPhoto
  }

  async deleteSingle({ photoId, userId }: { photoId: string; userId: string }) {
    const foundPhoto = await this.photoModel.findOne({ id: photoId })

    if (!foundPhoto) {
      throw new NotFoundException(`No Photo with id ${photoId} `)
    }
    if (foundPhoto.author.toString() !== userId) {
      throw new NotFoundException(` your are not the owner of this photo`)
    }

    await foundPhoto.delete()
    // this.userService.removePhoto({ authorId, PhotoId: deletedPhoto.id })

    return foundPhoto
  }

  async updateSingle({
    photoId,
    dto,
    userId,
  }: {
    photoId: string
    dto: UpdatePhotoDto
    userId: string
  }) {
    const foundPhoto = await this.photoModel.findOne({ id: photoId })

    if (!foundPhoto) {
      throw new NotFoundException(`No Photo with id ${photoId} `)
    }
    if (foundPhoto.author.toString() !== userId) {
      throw new NotFoundException(` your are not the owner of this photo`)
    }

    foundPhoto.path = dto.path
    await foundPhoto.save()

    return foundPhoto
  }

  async like(id: string, userId: string) {
    const updatedPhoto = await this.photoModel.findOneAndUpdate(
      { _id: id, liked: { $ne: userId } },
      { $push: { liked: userId }, $pull: { disliked: userId } },
      {
        new: true,
      },
    )
    return updatedPhoto
  }

  async dislike(id: string, userId: string) {
    const updatedPhoto = await this.photoModel.findOneAndUpdate(
      { _id: id, disliked: { $ne: userId } },
      { $push: { disliked: userId }, $pull: { liked: userId } },
      {
        new: true,
      },
    )
    return updatedPhoto
  }
}
