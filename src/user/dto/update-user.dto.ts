import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { NewUserDto } from './new-user.dto'
import { AdditionalUserInfo } from './additional-user-info.dto'

export class UpdateUserDto extends PartialType(
  IntersectionType(
    OmitType(NewUserDto, ['password']),
    OmitType(AdditionalUserInfo, ['roles']),
  ),
) {}
