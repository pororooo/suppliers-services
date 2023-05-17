import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateSupplierInput } from './model/createSupplierInput.model';
import { GrpcClientSupplierService } from 'src/grpc/client/client.server';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { SupplierService } from './supplier.service';
import { UpdateSupplierInput } from './model/updateSupplierInput.model';
import { Supplier } from './model/supplier.entity';

@Injectable()
@Resolver((of) => Supplier)
export class SupplierResolver {
  constructor(
    private readonly fileService: GrpcClientSupplierService,
    private readonly supplierService: SupplierService,
  ) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query(() => SupplierOutput)
  async getAllSuppliers(): Promise<SupplierOutput> {
    this.logger.log('getAll');
    const result = await this.supplierService.getAll();
    this.logger.log(result);
    return result;
  }
  @Query(() => SupplierOutput)
  async getSupplier(
    @Args('vat_number') vat_number: string,
  ): Promise<SupplierOutput> {
    this.logger.log('getOneSupplier');
    const result = await this.supplierService.getOne(vat_number);
    this.logger.log(result);
    return result;
  }
  @Mutation(() => SupplierOutput)
  async createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ): Promise<SupplierOutput> {
    this.logger.log('create');
    const result = await this.supplierService.create(createSupplierInput);
    this.logger.log(result);
    return result;
  }
  @Mutation(() => SupplierOutput)
  async updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ): Promise<SupplierOutput> {
    this.logger.log('update');
    const result = await this.supplierService.update(updateSupplierInput);
    this.logger.log(result);
    return result;
  }
  @Mutation(() => SupplierOutput)
  async deleteSupplier(
    @Args('vat_number') vat_number: string,
  ): Promise<SupplierOutput> {
    this.logger.log('delete');
    const result = await this.supplierService.delete(vat_number);
    this.logger.log(result);
    return result;
  }
}
