import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { SupplierService } from '../../supplier/supplier.service';

@Injectable()
export class GrpcClientSupplier implements OnModuleInit {
  private readonly logger = new Logger(GrpcClientSupplier.name);


  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'supplier',
      protoPath: join(__dirname, '../proto/supplier.proto'),
    },
  })
  private client: ClientGrpc;
  private SupplierService: SupplierService;

  onModuleInit() {
    this.SupplierService = this.client.getService<SupplierService>('Supplier');
  }
}
