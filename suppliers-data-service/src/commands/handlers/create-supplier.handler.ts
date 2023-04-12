import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSupplierCommand } from '../impl/create-supplier.command';
import { Supplier } from 'src/models/supplier.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common/services';
import { EventBus } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from 'src/events/impl/supplier-created.event';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand>
{
  private readonly logger = new Logger(CreateSupplierHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateSupplierCommand) {
    const { vat_number, name, country, roles, sector, certificate_link } =
      command;
    const supplier = new Supplier();
    supplier.vat_number = vat_number;
    supplier.name = name;
    supplier.country = country;
    supplier.roles = roles;
    supplier.sector = sector;
    supplier.certificate_link = certificate_link;

    this.logger.log('create supplier ' + supplier.name);

    const supplierDB: Supplier = await this.supplierRepository.save(supplier);

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
      new SupplierCreatedEvent(
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
