import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => String)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
