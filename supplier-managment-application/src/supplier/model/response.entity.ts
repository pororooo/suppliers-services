import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field(() => Int)
  status: number;

  @Field(()=> String)
  message: string;
}
