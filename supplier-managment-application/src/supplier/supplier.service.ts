import { Injectable, Logger } from '@nestjs/common';
import { SupplierInput } from './model/supplierInput.model';
import { SupplierOutput } from './model/supplierOutput.model';
import { GrpcClientService } from 'src/grpc/client/client.server';

@Injectable()
export class SupplierService {
  private grpcService: GrpcClientService;
  private readonly logger = new Logger(SupplierService.name);

  async findAll(): Promise<SupplierOutput[]> {
    this.logger.log('find all');
    const supplier = new SupplierOutput();

    return [supplier];
  }
  async sendData(data: SupplierOutput): Promise<SupplierOutput[]> {
    this.logger.log('send data');
    console.log(`Received data: ${JSON.stringify(data)}`);
    return [data];
    // return this.grpcService.sendData(data);
  }
  // async sendData(data: SupplierOutput): Promise<SupplierOutput> {
  //   this.logger.log('send data');
  //   console.log(`Received data: ${JSON.stringify(data)}`);

  //   try {
  //     const result = await this.client.send('SendData', data).toPromise();
  //     console.log(`Received result: ${JSON.stringify(result)}`);
  //     return result;
  //   } catch (error) {
  //     console.error('Failed to send data', error);
  //     throw error;
  //   }
  // }
}
