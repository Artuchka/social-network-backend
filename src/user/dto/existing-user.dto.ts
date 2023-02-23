import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEmail } from 'class-validator'

export class ExistingUserDto {
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
