import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class FileOutput {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  supplierName: string;

  @Field((type) => String)
  path: string;

  @Field((type) => String)
  createdAt: string;

  @Field((type) => String)
  updatedAt: string;

  @Field((type) => Int)
  _v: number;
}
