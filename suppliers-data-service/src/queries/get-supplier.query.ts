import { IQuery } from '@nestjs/cqrs';
export class GetSupplierQuery implements IQuery {
  readonly vat_number: number;

  constructor(options: GetSupplierQuery) {
    Object.assign(this, options);
  }
}
