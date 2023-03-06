import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guards/jwt.guard'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../user/decorators/user.decorator'
import { PhotoService } from './services/photo.service'
import { NewPhotoDto } from './dto/new-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'

@ApiTags('Photo')
@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  async getAll() {
    const photos = await this.photoService.getAll()

    return {
      message: 'all photos',
      photos,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single photo' })
  async getSingle(@Param('id') id: string) {
    const photo = await this.photoService.getSingle(id)

    return {
      message: 'single photo',
      photo,
    }
  }

  @Post('upload')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Upload a photo' })
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPhoto(
    @UploadedFiles() files: Express.Multer.File[],
    @User('id') author: string,
  ) {
    console.log({ files })
    const { paths, savedPercentage } = await this.photoService.uploadImages({
      author,
      files,
    })

    return {
      message: `${files.length} фото загружено, сжали на ${savedPercentage}% 🤞`,
      paths,
    }
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a photo' })
  async create(@Body() dto: NewPhotoDto, @User('id') author: string) {
    const photo = await this.photoService.create({ author, dto })

    return {
      message: 'created photo',
      photo,
    }
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete photo' })
  async deleteSingle(@Param('id') photoId: string, @User('id') userId: string) {
    const photo = await this.photoService.deleteSingle({ photoId, userId })

    return {
      message: 'deleted photo',
      photo,
    }
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update photo' })
  async updateSingle(
    @Param('id') photoId: string,
    @Body() dto: UpdatePhotoDto,
    @User('id') userId: string,
  ) {
    const photo = await this.photoService.updateSingle({ photoId, dto, userId })

    return {
      message: 'updated photo',
      photo,
    }
  }

  @Get(':id/like')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Like photo' })
  async likePhoto(@Param('id') id: string, @User('id') userId: string) {
    const photo = await this.photoService.like(id, userId)

    console.log({ photo })

    if (!photo) {
      throw new BadRequestException(
        `Alrady liked by ${userId} OR photo doesnot exist`,
      )
    }

    return {
      message: 'liked photo',
      photo,
    }
  }

  @Get(':id/dislike')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Dislike photo' })
  async dislikePhoto(@Param('id') id: string, @User('id') userId: string) {
    const photo = await this.photoService.dislike(id, userId)

    if (!photo) {
      throw new BadRequestException(`Alrady disliked by ${userId}`)
    }

    return {
      message: 'disliked photo',
      photo,
    }
  }
}
