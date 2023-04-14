import { Injectable } from '@nestjs/common';
import { supplierDto } from 'src/dto/supplier.dto';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierRepository extends Repository<Supplier> {}
//   async createSupplier(supplierDto: supplierDto) {
//     const supplier = new Supplier();
//     supplier.setData(supplierDto);
//     supplier.create();
//     return supplier;
//   }
//   async updateSupplier(supplierDto: supplierDto) {
//     const supplier = new Supplier();
//     supplier.setData(supplierDto);
//     supplier.update();
//     return supplier;
//   }
//   async deleteSupplier(supplierDto: supplierDto) {
//     const supplier = new Supplier();
//     supplier.setData(supplierDto);
//     supplier.delete();
//     return supplier;
//   }
// }
