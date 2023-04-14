import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierUpdatedEvent } from '../impl/supplier-updated.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common';

@EventsHandler(SupplierUpdatedEvent)
export class SupplierUpdatedHandler
  implements IEventHandler<SupplierUpdatedEvent>
{
  private readonly logger = new Logger(SupplierUpdatedHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private repository: SupplierRepository,
    private service: SupplierService,
  ) {}

  async handle(event: SupplierUpdatedEvent) {
    const { supplierDto } = event;

    const supplier = await this.service.findOneByVat(supplierDto.vat_number);
    if (!supplier) {
      throw new Error(
        `Supplier with vat_number ${supplierDto.vat_number} not found`,
      );
    }

    supplier.name = supplierDto.name;
    supplier.country = supplierDto.country;
    supplier.roles = supplierDto.roles;
    supplier.sector = supplierDto.sector;
    supplier.certificate_link = supplier.certificate_link;

    await this.repository.save(supplier);

    this.logger.log(`Received SupplierUpdatedEvent for ${supplierDto.name}`);
  }
}
