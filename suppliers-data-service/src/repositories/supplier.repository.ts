import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Supplier } from 'src/models/supplier.model';

@Injectable()
export class SupplierRepository extends TypeOrmCrudService<Supplier> {
  constructor(@InjectRepository(Supplier) repo) {
    super(repo);
  }
  async createSupplier(supplierDto) {
    const supplier = new Supplier();
    supplier.setData(supplierDto);
    supplier.createSupplier();
    return supplier;
  }
  async updateSupplier(supplierDto) {
    const supplier = new Supplier();
    supplier.setData(supplierDto);
    supplier.updateSupplier();
    return supplier;
  }
  async deleteSupplier(supplierDto: any) {
    supplierDto.delete();
    return supplierDto;
  }

  async save(supplier: Supplier): Promise<Supplier> {
    return await this.save(supplier);
  }
  async delete(supplier: Supplier): Promise<Supplier> {
    return await this.delete(supplier);
  }
}
