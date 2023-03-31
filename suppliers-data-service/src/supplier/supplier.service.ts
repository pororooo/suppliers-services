import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from 'src/dto/createSupplier.dto';
import { GetSupplierDto } from 'src/dto/getSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async getSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }
  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    const { vat_number, name, country, roles, sector, certificate_link } =
      createSupplierDto;
    const supplier = new Supplier();
    supplier.vat_number = vat_number;
    supplier.name = name;
    supplier.country = country;
    supplier.roles = roles;
    supplier.sector = sector;
    supplier.certificate_link = certificate_link;

    return this.supplierRepository.save(supplier);
  }
}
// Supplier(supplierDetails: CreateSupplierDto) {
//   const newSupplier = this.supplierRepository.create({
//     ...supplierDetails,
//   });
//   return this.supplierRepository.save(newSupplier);
// }
