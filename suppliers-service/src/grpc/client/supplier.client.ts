import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { SupplierGrpcService } from '../server/supplier.service';
import { Observable } from 'rxjs/internal/Observable';
import { SupplierOutput } from '../model/supplierOutput.model';
import { SupplierInput } from '../model/supplierInput.model';
import { SupplierService } from 'src/microservices/suppliers-data-service/src/supplier/supplier.service';

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
  
  client: ClientGrpc;

  private supplierGrpcService: SupplierGrpcService;
  private supplierService: SupplierService;
  private grpcService: any;//send a request to the remote server

  onModuleInit() {
    this.supplierGrpcService =
      this.client.getService<SupplierGrpcService>('Supplier');
  }
  // async getSuppliers(): Promise<any> {
  //   return await this.supplierService.getSupplier();
  // }
    async sendData(data: SupplierOutput): Promise<SupplierOutput> {
    this.logger.log('send data');
    console.log(`Received data: ${JSON.stringify(data)}`);

    const grpcClient = this.client.getService<SupplierGrpcService>('SupplierGrpcService');

    return new Promise((resolve, reject) => {
      grpcClient.sendData(data, (error: any, result: SupplierOutput) => {
        if (error) {
          console.error('Failed to send data', error);
          reject(error);
        } else {
          console.log(`Received result: ${JSON.stringify(result)}`);
          resolve(result);
        }
      });
    });
  }

}
