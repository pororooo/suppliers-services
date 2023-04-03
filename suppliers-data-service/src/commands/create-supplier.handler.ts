import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSupplierCommand } from './create-supplier.command';
import { Supplier } from '../entity/supplier.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler
  implements ICommandHandler<CreateSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
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

    await this.supplierRepository.insert(supplier);
  }
}
