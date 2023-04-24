import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { SupplierInput } from './model/supplierInput.model';
import { GrpcClientService } from 'src/grpc/client/client.server';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import fetch from 'node-fetch';

@Injectable()
@Resolver((of) => SupplierInput)
export class SupplierResolver {
  constructor(private readonly supplierService: GrpcClientService) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query((returns) => SupplierOutput)
  async getSupplier(): Promise<SupplierOutput[]> {
  try {
    const response = await fetch('http://localhost:3001/upload');
    const data = await response.json();
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
    const result = await this.supplierService.sendData(
      supplierinput,
      // vat_number: supplierinput.vat_number,
      // name: supplierinput.name,
      // country: supplierinput.country,
      // roles: supplierinput.roles,
      // sector: supplierinput.sector,
      // certificate_link: supplierinput.certificate_link,
    );
    return [result];
  }
  // @Mutation(() => SupplierOutput)
  // async updateSupplierData(
  //   @Args('vat_number') vat_number: Number,
  //   @Args('supplierinput') supplierinput: SupplierInput,
  // ): Promise<SupplierOutput> {
  //   this.logger.log(`Updating supplier with ID: ${vat_number}`);
  //   const result = await this.supplierService.updateData(vat_number, supplierinput);
  //   return result;
  // }
  // @Mutation(() => SupplierOutput)
  // async deleteSupplierData(
  //   @Args('vat_number') vat_number: Number,
  // ){
  //   this.logger.log(`Deleting supplier with ID: ${vat_number}`);
  //   await this.supplierService.deleteData(vat_number);
  // }
}
