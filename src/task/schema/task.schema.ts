import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@ObjectType()
@Schema()
export class Task {
  @Prop()
  @Field(() => String)
  task: string;

  @Prop()
  @Field(() => Boolean)
  status: boolean;

  @Prop()
  author: mongoose.Schema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
