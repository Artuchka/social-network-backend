import { PartialType } from '@nestjs/swagger'
import { NewPhotoDto } from './new-photo.dto'

export class UpdatePhotoDto extends PartialType(NewPhotoDto) {}
