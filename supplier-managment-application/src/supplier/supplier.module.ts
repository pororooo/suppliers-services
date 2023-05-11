import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { GrpcClientSupplierService } from 'src/grpc/client/client.server';
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
          protoPath: join(__dirname, '../supplier/supplier.proto'),
          url: 'localhost:5000'
        },
      },
    ]),
  ],
  // controllers: [OrderController],      resolver?
  providers: [GrpcClientSupplierService, SupplierResolver, SupplierService],
})
export class SupplierModule {}
