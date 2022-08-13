import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  task: string;

  @Prop({ default: false })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
