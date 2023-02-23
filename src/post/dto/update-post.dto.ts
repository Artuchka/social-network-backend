import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types'
import { AdditionalPostInfo, NewPostDto } from './new-post.dto'

export class UpdatePostDto extends PartialType(
  IntersectionType(
    OmitType(NewPostDto, ['authorId'] as const),
    AdditionalPostInfo,
  ),
) {}
