import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from '../impl/supplier-created.event';
import { Logger } from '@nestjs/common/services';

@EventsHandler(SupplierCreatedEvent)
export class SupplierCreatedHandler
  implements IEventHandler<SupplierCreatedEvent>
{
  private readonly logger = new Logger(SupplierCreatedHandler.name);

  async handle(event: SupplierCreatedEvent) {
    this.logger.log(event.name);
  }
}
