import { IsDefined, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
