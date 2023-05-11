import { IEvent } from '@nestjs/cqrs';
export class SupplierDeletedEvent implements IEvent {
  constructor(public readonly vat_number: number) {}
}
