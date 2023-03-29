import { AggregateRoot } from '@nestjs/cqrs';
import { CreateSupplierCommand } from './commands/create-supplier.command';
import { SupplierCreatedEvent } from './events/supplier-created.event';

export class SupplierAggregate extends AggregateRoot {
  createSupplier(
    suppliername: string,
    vat_number: number,
    country: string,
    roles: string,
    sector: string,
    certificate_link: string,
  ) {
    const command = new CreateSupplierCommand(
      vat_number,
      suppliername,
      country,
      roles,
      sector,
      certificate_link,
    );
    this.apply(
      new SupplierCreatedEvent(
        vat_number,
        suppliername,
        country,
        roles,
        sector,
        certificate_link,
      ),
    );
  }
}
