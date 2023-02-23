import { IsDefined, IsString } from 'class-validator'

export class NewPostDto {
  @IsString()
  @IsDefined()
  authorId: string

  @IsString()
  @IsDefined()
  text: string
}
