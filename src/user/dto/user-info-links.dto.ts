import { IsOptional, IsString } from 'class-validator'

export class LinksDto {
  @IsOptional()
  @IsString()
  instagram: string

  @IsOptional()
  @IsString()
  twitter: string

  @IsOptional()
  @IsString()
  facebook: string

  @IsOptional()
  @IsString()
  site: string
}
