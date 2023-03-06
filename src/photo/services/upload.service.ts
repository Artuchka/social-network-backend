import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

import { v2 as cloudinary } from 'cloudinary'
import { MinifyImageService } from './minifiyImage.service'
import { assert } from 'console'
const streamifier = require('streamifier')

type FileType = 'image' | 'video'
export type ImageType = {
  secure_url: string
}

@Injectable()
export class UploadService {
  constructor(private minifiyService: MinifyImageService) {
    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    })
  }

  async uploadImages(files: Express.Multer.File[]) {
    const maxSizeImage = 1024 * 1024 * 2

    if (!files || files?.length < 1) {
      throw new BadRequestException(`Пожалуйста, предоставьте фото`)
    }

    let initialBytesAmount = 0
    const uploadFileInfo = await Promise.all(
      files.map(async (img) => {
        initialBytesAmount += img.size
        return await this.uploadToCloud(img, 'image', maxSizeImage)
      }),
    )

    let allBytesSaved = 0
    const uploadPaths = uploadFileInfo.map((uploadInfo) => {
      const imageInfo = uploadInfo.image
      allBytesSaved += uploadInfo.bytesSaved
      return imageInfo.secure_url
    })

    const savedPercentage = (
      (allBytesSaved / initialBytesAmount) *
      100
    ).toFixed(2)

    return {
      savedPercentage,
      paths: uploadPaths,
    }
  }

  async uploadToCloud(
    file: Express.Multer.File,
    type: FileType,
    maxSize: number,
  ) {
    let regex = /image\//
    if (type === 'video') {
      regex = /video\//
    }
    if (!file?.mimetype?.match(regex)) {
      throw new BadRequestException(
        `Пожалуйста предоставьте файлы типа ${type}`,
      )
    }
    if (file?.size > maxSize) {
      throw new BadRequestException(
        `Файл слишком большой, отправляйте до ${
          maxSize / 1024 / 1024
        } MB = ${maxSize} bytes`,
      )
    }

    if (type === 'image') {
      const { minifiedBuffer, bytesSaved } =
        await this.minifiyService.minifyImage(file)
      if (!minifiedBuffer) {
        throw new BadRequestException(`Unable to minify`)
      }
      const image: ImageType = await this.uploadBufferToCloud(
        minifiedBuffer,
        type,
      )
      console.log({ minifiedBuffer, bytesSaved })
      return { image, bytesSaved }
    }

    if (type === 'video') {
      const video = await this.uploadFileToCloud(file, type)
      return { video, bytesSaved: 0 }
    }
  }

  uploadBufferToCloud(buffer: Buffer, type: FileType): Promise<ImageType> {
    return this.uploadToCloudController(buffer, type)
  }
  uploadFileToCloud(file: Express.Multer.File, type: FileType) {
    return this.uploadToCloudController(file.buffer, type)
  }

  async uploadToCloudController(
    buffer: Buffer,
    type: FileType,
  ): Promise<ImageType> {
    return await new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { folder: 'OZON', resource_type: type },
        (error, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(error)
          }
        },
      )

      streamifier.createReadStream(buffer).pipe(stream)
    })
  }
}
