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
  @ApiProperty({
    description: 'contents of comment',
  })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @IsDefined()
  @Type(() => NewContentDto)
  content: NewContentDto
}
