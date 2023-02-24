import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { Role } from '../enums/role.enum'
import { Gender } from '../enums/gender.enum'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { LocationSchema } from '../schemas/location.schema'
import { Location } from '../schemas/location.schema'
import { Type } from 'class-transformer'

export class LocationDto {
  @IsOptional()
  readonly city: string
  @IsOptional()
  readonly country: string
  @IsOptional()
  readonly coordinates: {
    x: string
    y: string
  }
}

export class NewUserDto {
  @ApiProperty({
    example: 'yandex@gmail.com',
    description: 'Email address',
  })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsDefined()
  readonly email: string

  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  @IsDefined()
  readonly password: string
}

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
