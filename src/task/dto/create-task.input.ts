import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  task: string;

  @Field(() => Boolean)
  status: boolean;
}
