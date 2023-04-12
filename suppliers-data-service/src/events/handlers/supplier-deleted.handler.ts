import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierDeletedEvent } from '../impl/supplier-deleted.event';
import { Logger } from '@nestjs/common/services';

@EventsHandler(SupplierDeletedEvent)
export class SupplierDeletedHandler
  implements IEventHandler<SupplierDeletedEvent>
{
  private readonly logger = new Logger(SupplierDeletedHandler.name);

  handle(event: SupplierDeletedEvent) {
    this.logger.log('SupplierDeletedEvent...' + event.vat_number);
  }
}
