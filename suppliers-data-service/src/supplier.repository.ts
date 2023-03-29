import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Supplier } from './entity/supplier.entity';

@Injectable()
export class SupplierRepository extends TypeOrmCrudService<Supplier> {
  constructor(@InjectRepository(Supplier) repo) {
    super(repo);
  }

  async save(supplier: Supplier): Promise<Supplier> {
    return await this.save(supplier);
  }
}
