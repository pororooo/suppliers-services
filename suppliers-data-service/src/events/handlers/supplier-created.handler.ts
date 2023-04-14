import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from '../impl/supplier-created.event';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { Supplier } from 'src/entity/supplier.entity';

@EventsHandler(SupplierCreatedEvent)
export class SupplierCreatedHandler
  implements IEventHandler<SupplierCreatedEvent>
{
  private readonly logger = new Logger(SupplierCreatedHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private repository: SupplierRepository,
  ) {}

  async handle(event: SupplierCreatedEvent) {
    const { supplierDto } = event;

    const supplier = new Supplier();

    supplier.vat_number = supplierDto.vat_number;
    supplier.name = supplierDto.name;
    supplier.country = supplierDto.country;
    supplier.roles = supplierDto.roles;
    supplier.sector = supplierDto.sector;
    supplier.certificate_link = supplierDto.certificate_link;

    await this.repository.save(supplier);

    this.logger.log(`Received SupplierCreatedEvent for ${supplierDto.name}`);
  }
}
