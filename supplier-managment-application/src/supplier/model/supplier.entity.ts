import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Supplier {
  @Field(() => Int)
  vatNumber: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  roles: string;

  @Field(() => String)
  sector: string;

  @Field(() => String)
  certificateLink: string;
}
