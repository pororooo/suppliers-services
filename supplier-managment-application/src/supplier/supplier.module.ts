import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { GrpcClientService } from 'src/grpc/client/client.server';

@Module({
  providers: [GrpcClientService, SupplierResolver, SupplierService]
})
export class SupplierModule {}
