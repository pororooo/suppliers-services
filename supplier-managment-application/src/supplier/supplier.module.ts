import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUPPLIER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'supplier',
          protoPath: join(__dirname, '../grpc/proto/supplier.proto'),
          url: 'localhost:50051'
        },
      },
    ]),
  ],
  providers: [ SupplierResolver, SupplierService],
})
export class SupplierModule {}
