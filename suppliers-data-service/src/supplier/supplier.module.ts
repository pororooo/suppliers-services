import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateSupplierHandler } from 'src/commands/handlers/create-supplier.handler';
import { GetSupplierHandler } from 'src/queries/get-supplier.handler';
import { UpdateSupplierHandler } from 'src/commands/handlers/update-supplier.handler';
import { DeleteSupplierHandler } from 'src/commands/handlers/delete-supplier.handler';
import { Supplier } from 'src/models/supplier.model';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { AuthModule } from 'src/auth/auth.module';
import { SupplierRepository } from 'src/repositories/supplier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier]), CqrsModule, AuthModule],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    GetSupplierHandler,
    CreateSupplierHandler,
    UpdateSupplierHandler,
    DeleteSupplierHandler,
    SupplierRepository,
  ],
})
export class SupplierModule {}
