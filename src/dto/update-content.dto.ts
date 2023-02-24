import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { NewContentDto } from './new-content.dto'

export class UpdateContentDto extends NewContentDto {
  @IsOptional()
  readonly text: string
}
