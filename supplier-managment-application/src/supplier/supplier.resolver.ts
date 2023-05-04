import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierInput } from './model/supplierInput.model';
import { GrpcClientSupplierService } from 'src/grpc/client/client.server';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { FileOutput } from './model/fileOutput.model';
import { FileInput } from './model/Fileinput.model';

@Injectable()
@Resolver((of) => SupplierInput)
export class SupplierResolver {
  constructor(private readonly supplierService: GrpcClientSupplierService) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query(() => FileOutput)
  async getFileInfo(
    @Args('supplierName', { nullable: true }) supplierName: string,
    @Args('path', { nullable: true }) path: string,
  ): Promise<FileOutput> {
    const data = await this.supplierService.getAll({
      supplierName,
      path,
    });
    this.logger.log(data);
    return data;
  }
  @Mutation(() => FileOutput)
  async sendFileName(
    @Args('fileName') fileinput: FileInput,
  ): Promise<FileOutput> {
    this.logger.log('mutation');
    const result = await this.supplierService.sendFilePath(fileinput);
    this.logger.log(result);
    return result;
  }
  @Mutation(() => SupplierOutput)
  async sendDataToGrpcServer(
    @Args('supplierinput') supplierinput: SupplierInput,
  ): Promise<SupplierOutput> {
    this.logger.log('mutation');
    const result = await this.supplierService.sendData(supplierinput);
    this.logger.log(result);
    return result;
  }
}
