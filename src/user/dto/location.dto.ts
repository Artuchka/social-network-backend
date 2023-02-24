import { IsOptional } from 'class-validator'

export class LocationDto {
  @IsOptional()
  readonly city: string
  @IsOptional()
  readonly country: string
  @IsOptional()
  readonly coordinates: {
    x: string
    y: string
  }
}
