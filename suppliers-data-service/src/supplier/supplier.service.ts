import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { supplierDto } from 'src/dto/supplier.dto';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSupplierCommand } from 'src/commands/impl/create-supplier.command';
import { GetSupplierQuery } from 'src/queries/get-supplier.query';
import { DeleteSupplierCommand } from 'src/commands/impl/delete-supplier.command';
import { UpdateSupplierCommand } from 'src/commands/impl/update-supplier.command';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier | undefined>,
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  private readonly logger = new Logger(SupplierService.name);

  async createSupplier(supplier: supplierDto) {
    return await this.commandBus.execute(
      new CreateSupplierCommand(
        supplier.vat_number,
        supplier.name,
        supplier.country,
        supplier.roles,
        supplier.sector,
        supplier.certificate_link,
      ),
    );
  }
  async deleteSupplier(supplier: DeleteSupplierCommand) {
    return await this.commandBus.execute(supplier);
  }

  async updateSupplier(supplier: supplierDto) {
    return await this.commandBus.execute(
      new UpdateSupplierCommand(
        supplier.vat_number,
        supplier.name,
        supplier.country,
        supplier.roles,
        supplier.sector,
        supplier.certificate_link,
      ),
    );
  }

  async getSupplier() {
    return await this.queryBus.execute(new GetSupplierQuery());
  }

  async findOneByVat(vat_number: number): Promise<Supplier | undefined> {
    const supplier = await this.supplierRepository
      .createQueryBuilder('supplier')
      .select([
        'supplier.vat_number',
        'supplier.name',
        'supplier.country',
        'supplier.roles',
        'supplier.sector',
        'supplier.certificate_link',
      ])
      .where('supplier.vat_number = :vat_number', { vat_number })
      .getOne();

    if (supplier) {
      this.logger.log('find supplier by vat_number');
      return supplier;
    }
    throw new BadRequestException('Wrong vat_number');
  }
}
