import { IEvent } from '@nestjs/cqrs';
import { supplierDto } from 'src/dto/supplier.dto';
export class SupplierCreatedEvent implements IEvent {
  constructor(public readonly supplierDto: supplierDto) {}
}
