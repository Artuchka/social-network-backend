import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { AdditionalPostInfo, NewPostDto } from './new-post.dto'
import { NewContentDto } from '../../dto/new-content.dto'
import { IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdateContentDto } from '../../dto/update-content.dto'

export class UpdatePostDto extends PartialType(
  OmitType(NewPostDto, ['author'] as const),
) {
  @IsOptional()
  @Type(() => UpdateContentDto)
  content: UpdateContentDto
}
