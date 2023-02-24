import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsDefined,
  IsNumberString,
  IsString,
  isArray,
} from 'class-validator'
import mongoose, { SchemaTypes } from 'mongoose'
import { User } from 'src/user/schemas/user.schema'

export class NewPostDto {
  @ApiProperty({
    example: '63f76752d07b5909501ead39',
    description: 'post author id',
  })
  @IsString()
  @IsDefined()
  authorId: string

  @ApiProperty({
    example: 'My day was awesome. I`ve tried ice-cream for the first time',
    description: 'text of post',
  })
  @IsString()
  @IsDefined()
  text: string
}

export class AdditionalPostInfo {
  // @ApiProperty({
  //   example: ['userID1', 'userID2'],
  //   description: 'array of user IDs who liked this post',
  //   isArray: true,
  //   type: SchemaTypes.ObjectId,
  // })
  @IsArray()
  liked: [User]

  // @ApiProperty({
  //   example: ['userID1', 'userID2'],
  //   description: 'array of user IDs who disliked this post',
  //   isArray: true,
  //   type: SchemaTypes.ObjectId,
  // })
  @IsArray()
  disliked: [User]
}
