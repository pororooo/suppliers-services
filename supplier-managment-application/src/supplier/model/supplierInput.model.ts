import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SupplierInput {
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

  // @Field(() => Buffer)
  // content: Buffer;

  @Field()
  file_name: string;

  @Field()
  file_type: string;
}
