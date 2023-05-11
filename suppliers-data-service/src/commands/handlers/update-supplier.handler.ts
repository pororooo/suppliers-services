import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSupplierCommand } from '../impl/update-supplier.command';
import { Supplier } from 'src/entity/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common/services';
import { EventBus } from '@nestjs/cqrs';
import { SupplierUpdatedEvent } from 'src/events/impl/supplier-updated.event';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { supplierDto } from 'src/dto/supplier.dto';

@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler
  implements ICommandHandler<UpdateSupplierCommand>
{
  private readonly logger = new Logger(UpdateSupplierHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: SupplierRepository,
    private service: SupplierService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(supplier: UpdateSupplierCommand) {
    const updatedSupplier = await this.service.findOneByVat(
      supplier.vat_number,
    );
    updatedSupplier.name = supplier.name || updatedSupplier.name;
    updatedSupplier.country = supplier.country || updatedSupplier.country;
    updatedSupplier.roles = supplier.roles || updatedSupplier.roles;
    updatedSupplier.sector = supplier.sector || updatedSupplier.sector;
    updatedSupplier.certificate_link =
      supplier.certificate_link || updatedSupplier.certificate_link;

    this.logger.log('update supplier ' + supplier.name);

    const supplierDB: Supplier = await this.supplierRepository.save(
      updatedSupplier,
    );
    this.sendEvent(supplier, this.eventBus);

    return supplierDB;
  }

  async sendEvent(supplier: supplierDto, eventBus: EventBus) {
    eventBus.publish(new SupplierUpdatedEvent(supplier));
  }
}
