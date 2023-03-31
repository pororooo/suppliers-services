import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSupplierCommand } from './create-supplier.command';
//import { SupplierRepository } from '../supplier.repository';
import { Supplier } from '../entity/supplier.entity';
import { StoreEventBus } from 'event-sourcing-nestjs';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand>
{
  constructor(private readonly eventBus: StoreEventBus) {}

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

    this.eventBus.publish(
      new CreateSupplierCommand(
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
      ),
    );
  }

  // async execute(command: CreateSupplierCommand): Promise<Supplier> {
  //   return this.supplierRepository.save(supplier);
  // }
}
