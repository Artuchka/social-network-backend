import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { NewPostDto } from './new-post.dto'
import { IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdateContentDto } from '../../dto/update-content.dto'

export class UpdatePostDto extends PartialType(NewPostDto) {
  @IsOptional()
  @Type(() => UpdateContentDto)
  content: UpdateContentDto
}
