import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class NewPhotoDto {
  @ApiProperty({
    example: 'google.com/image1',
    description: 'path for the image',
  })
  @IsString()
  @IsDefined()
  path: string
}
