import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Coordinates, CoordinatesSchema } from './coordinates.schema'
import { HydratedDocument } from 'mongoose'

export type LocationDocument = HydratedDocument<Location>

@Schema()
export class Location {
  @Prop({
    type: String,
    default: '',
  })
  city: string

  @Prop({
    type: String,
    default: '',
  })
  country: string

  @Prop({
    type: CoordinatesSchema,
  })
  coordinates: Coordinates
}

export const LocationSchema = SchemaFactory.createForClass(Location)
