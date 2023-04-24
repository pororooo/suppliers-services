import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateSupplierCommand } from '../impl/create-supplier.command';
import { Supplier } from 'src/entity/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common/services';
import { EventBus } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from 'src/events/impl/supplier-created.event';
import { SupplierRepository } from 'src/repositories/supplier.repository';
import { supplierDto } from 'src/dto/supplier.dto';
@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand>
{
  private readonly logger = new Logger(CreateSupplierHandler.name);

  constructor(
    @InjectRepository(Supplier)
    private repository: SupplierRepository,
    private readonly supplierDto: supplierDto,
    private readonly publisher: EventPublisher,
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

    const supplierDB: Supplier = await this.repository.save(supplier);

    this.sendEvent(supplier, this.eventBus);

    return supplierDB;
  }
  async sendEvent(supplier: supplierDto, eventBus: EventBus) {
    eventBus.publish(new SupplierCreatedEvent(supplier));
  }
}
