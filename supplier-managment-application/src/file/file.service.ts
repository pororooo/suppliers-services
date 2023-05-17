import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';
import { SupplierOutput } from 'src/supplier/model/supplierOutput.model';
import { FileOutput } from 'src/file/model/fileOutput.model';
import fetch from 'node-fetch';

@Injectable()
export class FileService implements OnModuleInit {
  private readonly logger = new Logger(FileService.name);

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'supplier',
      protoPath: join(__dirname, '../proto/supplier.proto'),
    },
  })
  private client: ClientGrpc;
  private supplierService: SupplierService;
  private grpcService: any;

  onModuleInit() {
    this.supplierService =
      this.client.getService<SupplierService>('SupplierService');
  }
  async getAll({ supplierName, path }): Promise<FileOutput> {
    try {
      const response = await fetch('http://localhost:3001/files');
      const data = await response.json();
      this.logger.log(data)
      let dataBySupplierName = data;
      if(supplierName){
        this.logger.log(supplierName)
        dataBySupplierName = data.find((obj: {supplierName: string}) => obj.supplierName === supplierName)
        this.logger.log(dataBySupplierName)
        }
      path = [dataBySupplierName].map(
        (item: { path: string; fileName: string }) =>
          item.path + '\\' + item.fileName,
      );
      return path;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async sendData(data: SupplierOutput): Promise<SupplierOutput> {
    return data;
  }
  async sendFilePath(data: FileOutput): Promise<FileOutput> {
    this.logger.log(data)
    return data;
  }
}
