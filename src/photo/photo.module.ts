import { Module } from '@nestjs/common'
import { PhotoController } from './photo.controller'
import { PhotoService } from './services/photo.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Photo, PhotoSchema } from './photo.schema'
import { UserModule } from '../user/user.module'
import { UploadService } from './services/upload.service'
import { MinifyImageService } from './services/minifiyImage.service'

@Module({
  controllers: [PhotoController],
  providers: [PhotoService, UploadService, MinifyImageService],
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    UserModule,
  ],
  exports: [PhotoService],
})
export class PhotoModule {}
