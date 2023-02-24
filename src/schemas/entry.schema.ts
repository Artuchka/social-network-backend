// export type Entry = {
//   author: ID;
//   likes: number;
//   comments: Array<Comment>;
// };

import { Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Entry {
  author: string
  // likes:
}

export const EntrySchema = SchemaFactory.createForClass(Entry)
