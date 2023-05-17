import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSupplierInput {
  @Field((type) => Int)
  vat_number: number;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  roles: string;

  @Field()
  sector: string;

  @Field()
  certificate_link: string;
}
