import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';
import { GetSupplierQuery } from 'src/queries/get-supplier.query';

@QueryHandler(GetSupplierQuery)
export class GetSupplierHandler implements IQueryHandler<GetSupplierQuery> {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}
  async execute(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }
}
