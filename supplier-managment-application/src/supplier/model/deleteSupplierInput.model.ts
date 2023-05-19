import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteSupplierInput {
  @Field((type) => Int)
  vat_number: number;
}
