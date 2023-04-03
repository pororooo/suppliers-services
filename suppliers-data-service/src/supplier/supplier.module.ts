import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSupplierHandler } from 'src/commands/create-supplier.handler';
import { GetSupplierHandler } from 'src/commands/get-supplier.handler';
import { UpdateSupplierHandler } from 'src/commands/update-supplier.handler';
import { DeleteSupplierHandler } from 'src/commands/delete-supplier.handler';
import { Supplier } from '../entity/supplier.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), CqrsModule],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    GetSupplierHandler,
    CreateSupplierHandler,
    UpdateSupplierHandler,
    DeleteSupplierHandler,
  ],
})
export class SupplierModule {}
