import { ICommand } from '@nestjs/cqrs';

export class DeleteSupplierCommand implements ICommand {
  constructor(public readonly vat_number: number) {}
}
