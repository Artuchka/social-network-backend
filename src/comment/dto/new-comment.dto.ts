import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmptyObject,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  isArray,
} from 'class-validator'
import mongoose, { SchemaTypes } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'
import { Content } from '../../schemas/content.schema'
import { Type } from 'class-transformer'
import { NewContentDto } from '../../dto/new-content.dto'
import { SourceType } from '../source-type.enum'

export class NewCommentDto {
  // @ApiProperty({
  //   example: '63f76752d07b5909501ead39',
  //   description: 'comment author id',
  // })
  // @IsString()
  // @IsDefined()
  // author: string

  @ApiProperty({
    example: '63f76752d0312909501ead39',
    description: 'id of closest parent comment',
  })
  @IsString()
  @IsOptional()
  reply: string

  @ApiProperty({
    example: '63f76752d0312909501ead39',
    description: 'source id corresponding either to Post or Photo',
  })
  @IsString()
  @IsDefined()
  source: string

  @ApiProperty({
    example: '63f76752d0312909501ead39',
    description: 'post source type id',
    enum: SourceType,
  })
  @IsEnum(SourceType, { each: true })
  @IsDefined()
  sourceType: string

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

export class AdditionalPostInfo {}
