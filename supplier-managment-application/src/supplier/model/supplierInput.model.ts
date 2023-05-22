import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class SupplierInput {
  @Field((type) => Int)
  vatNumber: number;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  roles: string;

  @Field()
  sector: string;

  @Field()
  certificateLink: string;
}
