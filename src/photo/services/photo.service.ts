import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PhotoDocument } from '../photo.schema'
import mongoose, { Model, ObjectId, SchemaTypes } from 'mongoose'
import { NewPhotoDto } from '../dto/new-photo.dto'
import { UpdatePhotoDto } from '../dto/update-photo.dto'
import { UserEntriesService } from '../../user/services/user-entries.service'
import { UploadService } from './upload.service'

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel('Photo')
    private readonly photoModel: Model<PhotoDocument>,
    private readonly userEntriesService: UserEntriesService,
    private readonly uploadService: UploadService,
  ) {}

  async getAll() {
    const photos = await this.photoModel.find()

    return photos
  }

  async getSingle(id: string) {
    const photo = await this.photoModel.findById(id)

    if (!photo) {
      throw new NotFoundException(`No Photo with id ${id} `)
    }
    return photo
  }

  async create({ author, dto }: { author: string; dto: NewPhotoDto }) {
    console.log({ dto })

    const newPhoto = await this.photoModel.create({ ...dto, author })

    this.userEntriesService._addPhoto({
      authorId: author,
      photoId: newPhoto.id,
    })

    return newPhoto
  }

  async deleteSingle({ photoId, userId }: { photoId: string; userId: string }) {
    const foundPhoto = await this.photoModel.findById(photoId)

    if (!foundPhoto) {
      throw new NotFoundException(`No Photo with id ${photoId} `)
    }
    if (foundPhoto.author.toString() !== userId) {
      throw new NotFoundException(` your are not the owner of this photo`)
    }

    this.userEntriesService._removePhoto({
      authorId: userId,
      photoId: photoId,
    })
    await foundPhoto.delete()

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
    const foundPhoto = await this.photoModel.findById(photoId)

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

    this.userEntriesService._addLikeOnPhoto({
      photoId: updatedPhoto.id,
      authorId: userId,
    })
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

    this.userEntriesService._removeLikeOnPhoto({
      photoId: updatedPhoto.id,
      authorId: userId,
    })
    return updatedPhoto
  }

  async _checkPhotos(photos: string[]) {
    const photoPromises = photos.map(async (photoId) => {
      return await this.getSingle(photoId)
    })
    const ans = await Promise.all(photoPromises)
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })

    if (ans instanceof Error) {
      throw new BadRequestException(ans.message)
    }
  }
  async uploadImages({
    author,
    files,
  }: {
    author: string
    files: Express.Multer.File[]
  }) {
    const { paths, savedPercentage } = await this.uploadService.uploadImages(
      files,
    )

    return {
      paths,
      savedPercentage,
    }
  }
}
