import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteSupplierInput {
  @Field((type) => Int)
  vatNumber: number;
}
