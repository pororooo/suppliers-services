import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSupplierCommand } from '../impl/delete-supplier.command';
import { Supplier } from 'src/entity/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs/dist/event-bus';
import { SupplierDeletedEvent } from 'src/events/impl/supplier-deleted.event';
import { SupplierRepository } from 'src/repositories/supplier.repository';

@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler
  implements ICommandHandler<DeleteSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: SupplierRepository,
    private service: SupplierService,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(DeleteSupplierHandler.name);

  async execute(command: DeleteSupplierCommand) {
    const supplier = await this.service.findOneByVat(command.vat_number);
    this.logger.log('delete supplier with vat_number ' + command.vat_number);

    const supplierDB = await this.supplierRepository.delete(
      supplier.vat_number,
    );
    this.sendEvent(supplier.vat_number, this.eventBus);

    return supplierDB;
  }

  async sendEvent(vat_number: number, eventBus: EventBus) {
    eventBus.publish(new SupplierDeletedEvent(vat_number));
  }
}
