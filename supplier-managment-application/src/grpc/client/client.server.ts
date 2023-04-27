import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';
import { SupplierOutput } from 'src/supplier/model/supplierOutput.model';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private readonly logger = new Logger(GrpcClientService.name);

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'supplier',
      protoPath: join(__dirname, '../proto/supplier.proto'),
      // url: 'other-service'
    },
  })
  private client: ClientGrpc;
  private supplierService: SupplierService;
  private grpcService: any; //send a request to the remote server

  onModuleInit() {
    this.supplierService =
      this.client.getService<SupplierService>('SupplierService');
  }
  async sendData(data: SupplierOutput): Promise<SupplierOutput> {
    this.logger.log('send data');
    console.log(`Received data: ${JSON.stringify(data)}`);
    return data;
    // return this.grpcService.sendData(data);
  }
}
