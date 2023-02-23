import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { AdditionalUserInfo, NewUserDto } from './new-user.dto'

export class UpdateUserDto extends PartialType(
  IntersectionType(
    OmitType(NewUserDto, ['password']),
    OmitType(AdditionalUserInfo, ['roles']),
  ),
) {}
