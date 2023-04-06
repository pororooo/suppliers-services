import { IEvent } from '@nestjs/cqrs';
export class SupplierCreatedEvent implements IEvent {
  constructor(
    public readonly vat_number: number,
    public readonly name: string,
    public readonly country: string,
    public readonly roles: string,
    public readonly sector: string,
    public readonly certificate_link: string,
  ) {}
}
