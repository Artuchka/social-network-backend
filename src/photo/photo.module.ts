import { Module } from '@nestjs/common'
import { PhotoController } from './photo.controller'
import { PhotoService } from './photo.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Photo, PhotoSchema } from './photo.schema'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    UserModule,
  ],
})
export class PhotoModule {}
