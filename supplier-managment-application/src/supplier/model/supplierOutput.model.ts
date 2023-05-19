import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class SupplierOutput {
  @Field((type) => Int, { nullable: true })
  vat_number: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  roles: string;

  @Field({ nullable: true })
  sector: string;

  @Field({ nullable: true })
  certificate_link: string;
}
