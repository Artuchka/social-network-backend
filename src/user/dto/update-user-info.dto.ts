import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { LocationDto } from './location.dto'
import { LinksDto } from './user-info-links.dto'

export class UpdateUserInfoDto {
  @ApiPropertyOptional({
    example: 'BSTU "Voenmeh" in honor of Ustinov',
  })
  @IsOptional()
  @IsString()
  education: string

  @ApiPropertyOptional({
    example:
      'Wolf is weaker than lion, however does not perfomance in circus. auf...',
  })
  @IsOptional()
  @IsString()
  status: string

  @ApiPropertyOptional({
    example: '+79215350981',
  })
  @IsOptional()
  @IsString()
  phone: string

  @ApiPropertyOptional({
    example: '01.01.1999',
  })
  @IsOptional()
  @IsDateString()
  birthday: Date

  @ApiPropertyOptional({})
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @IsOptional()
  location: LocationDto

  @ApiPropertyOptional({})
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => LinksDto)
  @IsOptional()
  links: LinksDto
}
