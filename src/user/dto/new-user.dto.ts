import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator'
import { Role } from '../role.enum'
import { Gender } from '../gender.enum'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

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
  @IsDate()
  birthday: Date

  @ApiPropertyOptional({
    example: 'St. Petersburg',
  })
  @IsString()
  location: string

  @ApiPropertyOptional({
    example: 'img-src.com/1',
  })
  @IsString()
  avatar: string
}
