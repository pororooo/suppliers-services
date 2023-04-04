import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSupplierCommand } from '../impl/delete-supplier.command';
import { Supplier } from '../../entity/supplier.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';

@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler
  implements ICommandHandler<DeleteSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private service: SupplierService,
  ) {}

  async execute(supplier: DeleteSupplierCommand) {
    const deletedSupplier = await this.service.findOneByVat(
      supplier.vat_number,
    );
    await this.supplierRepository.delete(deletedSupplier);
  }
}
