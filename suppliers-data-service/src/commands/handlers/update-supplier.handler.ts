import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSupplierCommand } from '../impl/update-supplier.command';
import { Supplier } from 'src/models/supplier.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';

@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler
  implements ICommandHandler<UpdateSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private service: SupplierService,
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

    await this.supplierRepository.save(updatedSupplier);
  }
}
