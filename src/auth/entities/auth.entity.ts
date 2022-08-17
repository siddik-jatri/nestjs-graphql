import { ObjectType, Field } from '@nestjs/graphql';
import { User } from "../../user/schema/user.schema";

@ObjectType()
export class Auth {
  @Field(() => User)
  user: User;

  @Field(() => String)
  access_token: string;
}
