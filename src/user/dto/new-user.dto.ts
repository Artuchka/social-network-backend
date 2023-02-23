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

export class NewUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsDefined()
  readonly email: string

  @IsDefined()
  readonly password: string
}

export class AdditionalUserInfo {
  @IsString()
  password: string

  @IsString()
  firstname: string

  @IsString()
  lastname: string

  @IsString()
  username: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  @IsOptional()
  roles: [Role]

  @IsString()
  phone: string

  @IsEnum(Gender)
  @IsOptional()
  @IsString()
  gender: Gender

  @IsDate()
  birthday: Date

  @IsString()
  location: string

  @IsString()
  avatar: string
}
