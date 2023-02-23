import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { AdditionalUserInfo, NewUserDto } from './new-user.dto'

export class UpdateUserDto extends PartialType(
  IntersectionType(NewUserDto, AdditionalUserInfo),
) {}
