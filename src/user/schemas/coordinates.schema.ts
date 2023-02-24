import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CoordinatesDocument = HydratedDocument<Coordinates>

@Schema()
export class Coordinates {
  @Prop({
    type: String,
    default: '0.0',
  })
  x: string

  @Prop({
    type: String,
    default: '0.0',
  })
  y: string
}

export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates)
