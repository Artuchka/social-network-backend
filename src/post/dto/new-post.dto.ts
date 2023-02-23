import { IsDefined, IsNumberString, IsString } from 'class-validator'

export class NewPostDto {
  @IsString()
  @IsDefined()
  authorId: string

  @IsString()
  @IsDefined()
  text: string
}

export class AdditionalPostInfo {
  @IsNumberString()
  likesAmount: number
}
