import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierInput } from './model/supplierInput.model';
import { GrpcClientService } from 'src/grpc/client/client.server';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import fetch from 'node-fetch';
import { FileOutput } from './model/FileOutput.model';

@Injectable()
@Resolver((of) => SupplierInput)
export class SupplierResolver {
  constructor(private readonly supplierService: GrpcClientService) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query((returns) => FileOutput)
  async getFileInfo(): Promise<FileOutput[]> {
    try {
      const response = await fetch('http://localhost:3001/files');
      const data = await response.json();
      this.logger.log(data[0].path);//do map to have all pathes
      this.logger.log('query');
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
  @Mutation(() => SupplierOutput)
  async sendDataToGrpcServer(
    @Args('supplierinput') supplierinput: SupplierInput,
  ): Promise<SupplierOutput[]> {
    this.logger.log('mutation');
    const result = await this.supplierService.sendData(supplierinput);
    return [result];
  }
}
