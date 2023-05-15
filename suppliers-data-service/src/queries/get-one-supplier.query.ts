import { IQuery } from '@nestjs/cqrs';

export class FindOneSupplierQuery implements IQuery {
  constructor(public readonly vat_number: number) {}
}
