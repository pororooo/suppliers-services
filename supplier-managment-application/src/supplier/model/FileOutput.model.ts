import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class FileOutput {

  @Field({ nullable: true })
  supplierName?: string;

  @Field({ nullable: true })
  path?: string;

}
