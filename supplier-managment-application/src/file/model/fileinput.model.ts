import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileInput {

  @Field((type) => String)
  path: string;
}
