import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from '../impl/supplier-created.event';
import { Logger } from '@nestjs/common/services';
import { SupplierRepository } from 'src/supplier/supplier.repository';

@EventsHandler(SupplierCreatedEvent)
export class SupplierCreatedHandler
  implements IEventHandler<SupplierCreatedEvent>
{
  constructor(private repository: SupplierRepository) {}
  private readonly logger = new Logger(SupplierCreatedHandler.name);

  async handle({ vat_number, name }: SupplierCreatedEvent) {
    this.logger.log(vat_number, name);
  }
}

// @EventsHandler(SupplierCreatedEvent)
// export class SupplierCreatedHandler
//   implements IEventHandler<SupplierCreatedEvent>
// {
//   private readonly logger = new Logger(SupplierCreatedHandler.name);

//   handle(event: SupplierCreatedEvent) {
//     this.logger.log(event.name);
//   }
// }
