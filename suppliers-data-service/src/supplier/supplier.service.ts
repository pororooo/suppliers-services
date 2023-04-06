import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier | undefined>,
  ) {}
  private readonly logger = new Logger(SupplierService.name);

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
