import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

class CoordinatesDto {
  @ApiProperty({
    example: '57.1231',
    description: 'longitude',
  })
  readonly x: string

  @ApiProperty({
    example: '31.1231',
    description: 'lentitude',
  })
  readonly y: string
}

export class LocationDto {
  @ApiPropertyOptional({
    example: 'St. Petersburg',
    description: 'user city',
  })
  @IsOptional()
  readonly city: string

  @ApiPropertyOptional({
    example: 'Mother Russia',
    description: 'user countru',
  })
  @IsOptional()
  readonly country: string

  @ApiPropertyOptional({
    description: 'precise coordinates',
  })
  @IsOptional()
  readonly coordinates: CoordinatesDto
}
