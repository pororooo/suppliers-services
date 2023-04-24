import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common/services';
import { GetSupplierQuery } from 'src/queries/get-supplier.query';

@QueryHandler(GetSupplierQuery)
export class GetSupplierHandler implements IQueryHandler<GetSupplierQuery> {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}
  private readonly logger = new Logger(GetSupplierHandler.name);

  async execute(): Promise<Supplier[]> {
    this.logger.log('get suppliers');
    return await this.supplierRepository.find();
  }
}
