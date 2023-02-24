import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class NewContentDto {
  @ApiProperty({
    example: 'My day was awesome. I`ve tried ice-cream for the first time',
    description: 'text of post',
  })
  @IsDefined()
  @IsNotEmpty()
  readonly text: string

  @ApiProperty({
    example: ['google.com/image1', 'google.com/image2'],
    description: 'images of post',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images: [string]
}
