import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsNumberString,
  IsObject,
  IsString,
  ValidateNested,
  isArray,
} from 'class-validator'
import mongoose, { SchemaTypes } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { Content } from '../../schemas/content.schema'
import { Type } from 'class-transformer'
import { NewContentDto } from '../../dto/new-content.dto'

export class NewPostDto {
  // @ApiProperty({
  //   example: '63f76752d07b5909501ead39',
  //   description: 'post author id',
  // })
  // @IsString()
  // @IsDefined()
  // author: string

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @IsDefined()
  @Type(() => NewContentDto)
  content: NewContentDto
}
