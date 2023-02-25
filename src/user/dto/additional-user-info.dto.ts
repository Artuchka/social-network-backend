import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Gender } from '../enums/gender.enum'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { LocationDto } from './location.dto'
import { Role } from '../enums/role.enum'
import { UpdateUserInfoDto } from './update-user-info.dto'

export class AdditionalUserInfo {
  @ApiPropertyOptional({
    example: 'John',
  })
  @IsString()
  firstname: string

  @ApiPropertyOptional({
    example: 'Smith',
  })
  @IsString()
  lastname: string

  @ApiPropertyOptional({
    example: 'johnik',
  })
  @IsString()
  username: string

  @ApiPropertyOptional({
    example: 'male',
    enum: Gender,
    type: Gender,
    enumName: 'Gender',
  })
  @IsEnum(Gender)
  @IsOptional()
  @IsString()
  gender: Gender

  @ApiPropertyOptional({
    example: 'img-src.com/1',
  })
  @IsString()
  avatar: string

  @IsOptional()
  @Type(() => UpdateUserInfoDto)
  info: UpdateUserInfoDto
}

// @ApiPropertyOptional({
//   example: 'user',
//   enum: Role,
//   type: Role,
//   enumName: 'Role',
// })
// @IsArray()
// @IsString({ each: true })
// @ArrayMinSize(1)
// @IsEnum(Role, { each: true })
// @IsOptional()
// roles: [Role]
