import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { NewCommentDto } from './new-comment.dto'
import { NewContentDto } from '../../dto/new-content.dto'
import { IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdateContentDto } from '../../dto/update-content.dto'

export class UpdateCommentDto extends PartialType(
  OmitType(NewCommentDto, ['author'] as const),
) {
  @IsOptional()
  @Type(() => UpdateContentDto)
  content: UpdateContentDto
}
