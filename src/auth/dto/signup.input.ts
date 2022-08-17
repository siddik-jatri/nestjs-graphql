import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
