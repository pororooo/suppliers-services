import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSupplierCommand } from '../impl/update-supplier.command';
import { Supplier } from 'src/models/supplier.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common/services';
import { EventBus } from '@nestjs/cqrs';
import { SupplierUpdatedEvent } from 'src/events/impl/supplier-updated.event';

@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler
  implements ICommandHandler<UpdateSupplierCommand>
{
  private readonly logger = new Logger(UpdateSupplierHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private service: SupplierService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(supplier: UpdateSupplierCommand) {
    const updatedSupplier = await this.service.findOneByVat(
      supplier.vat_number,
    );

    updatedSupplier.name = supplier.name;
    updatedSupplier.country = supplier.country;
    updatedSupplier.roles = supplier.roles;
    updatedSupplier.sector = supplier.sector;
    updatedSupplier.certificate_link = supplier.certificate_link;

    this.logger.log('update supplier ' + supplier.name);

    const supplierDB: Supplier = await this.supplierRepository.save(
      updatedSupplier,
    );
    this.sendEvent(
      supplier.vat_number,
      supplier.name,
      supplier.country,
      supplier.roles,
      supplier.sector,
      supplier.certificate_link,
      this.eventBus,
    );

    return supplierDB;
  }

  private async sendEvent(
    vat_number: number,
    name: string,
    country: string,
    roles: string,
    sector: string,
    certificate_link: string,
    eventBus: EventBus,
  ) {
    eventBus.publish(
      new SupplierUpdatedEvent(
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
      ),
    );
  }
}
