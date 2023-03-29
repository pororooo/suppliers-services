import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { CreateSupplierHandler } from './commands/create-supplier.handler';
import { SupplierRepository } from './supplier.repository';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Supplier, SupplierRepository]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository, CreateSupplierHandler],
})
export class SupplierModule {}
