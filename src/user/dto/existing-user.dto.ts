import { IsDefined, IsEmail } from 'class-validator'

export class ExistingUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsDefined()
  readonly email: string

  @IsDefined()
  readonly password: string
}
