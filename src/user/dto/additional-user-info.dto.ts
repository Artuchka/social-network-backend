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
    example: 'user',
    enum: Role,
    type: Role,
    enumName: 'Role',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles: [Role]

  @ApiPropertyOptional({
    example: 'John',
  })
  @IsString()
  phone: string

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
    example: '01.01.1999',
  })
  @IsDateString()
  birthday: Date

  @ApiPropertyOptional({
    example: 'img-src.com/1',
  })
  @IsString()
  avatar: string

  @ApiPropertyOptional({
    // example: 'St. Petersburg',
  })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto
}
