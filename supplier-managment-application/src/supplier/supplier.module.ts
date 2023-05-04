import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { GrpcClientSupplierService } from 'src/grpc/client/client.server';

@Module({
  providers: [GrpcClientSupplierService, SupplierResolver, SupplierService],
})
export class SupplierModule {}
