import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable,Inject } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';
import { SupplierOutput } from 'src/supplier/model/supplierOutput.model';
// import { SupplierGrpcService } from '../../../../suppliers-service/src/grpc/server/supplier.service';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private readonly logger = new Logger(GrpcClientService.name);

  // constructor(
  //   @Inject('OTHER_SERVICE_PACKAGE') private readonly otherService: ClientGrpc
  // ) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'supplier',
      protoPath: join(__dirname, '../proto/supplier.proto'),
      // url: 'other-service.com:1234'

    },
  })
  
  private client: ClientGrpc;
  private supplierService: SupplierService;
  private grpcService: any;//send a request to the remote server

  onModuleInit() {
    this.supplierService =
      this.client.getService<SupplierService>('SupplierService');
  }
  async sendData(data: SupplierOutput):Promise<SupplierOutput> {
    this.logger.log('send data');
    console.log(`Received data: ${JSON.stringify(data)}`);
    return data;
    // return this.grpcService.sendData(data);
  }

  // async sendData(data: SupplierOutput): Promise<SupplierOutput> {
  //   this.logger.log('send data');
  //   console.log(`Received data: ${JSON.stringify(data)}`);

  //   const grpcClient = this.client.getService<SupplierGrpcService>('SupplierGrpcService');

  //   return new Promise((resolve, reject) => {
  //     grpcClient.sendData(data, (error: any, result: SupplierOutput) => {
  //       if (error) {
  //         console.error('Failed to send data', error);
  //         reject(error);
  //       } else {
  //         console.log(`Received result: ${JSON.stringify(result)}`);
  //         resolve(result);
  //       }
  //     });
  //   });
  // }
}






