import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common';
import { SupplierDeletedEvent } from '../impl/supplier-deleted.event';

@EventsHandler(SupplierDeletedEvent)
export class SupplierDeletedHandler
  implements IEventHandler<SupplierDeletedEvent>
{
  private readonly logger = new Logger(SupplierDeletedHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private repository: SupplierRepository,
    private service: SupplierService,
  ) {}

  async handle(event: SupplierDeletedEvent) {
    const { vat_number } = event;

    this.logger.log(
      `Received SupplierDeletedEvent for supplier with vat_ number ${vat_number}`,
    );
  }
}
