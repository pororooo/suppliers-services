import { ICommand } from '@nestjs/cqrs';
import { supplierDto } from 'src/dto/supplier.dto';
export class CreateSupplierCommand implements ICommand {
  constructor(public readonly supplierDto: supplierDto) {}
}
