import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { AdditionalPostInfo, NewPostDto } from './new-post.dto'

export class UpdatePostDto extends PartialType(
  IntersectionType(
    OmitType(NewPostDto, ['authorId'] as const),
    AdditionalPostInfo,
  ),
) {}
