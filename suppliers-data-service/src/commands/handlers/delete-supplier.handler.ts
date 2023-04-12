import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSupplierCommand } from '../impl/delete-supplier.command';
import { Supplier } from 'src/models/supplier.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from 'src/supplier/supplier.service';
import { Logger } from '@nestjs/common';

@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler
  implements ICommandHandler<DeleteSupplierCommand>
{
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private service: SupplierService,
  ) {}

  private readonly logger = new Logger(DeleteSupplierHandler.name);

  async execute(supplier: DeleteSupplierCommand) {
    const deletedSupplier = await this.service.findOneByVat(
      supplier.vat_number,
    );

    await this.supplierRepository.delete(deletedSupplier.vat_number);
  }
}
