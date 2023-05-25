import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierInput } from './model/supplierInput.model';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { SupplierService } from './supplier.service';
import { Supplier } from './model/supplier.entity';
import { Response } from './model/response.entity';
import { DeleteSupplierInput } from './model/deleteSupplierInput.model';

@Injectable()
@Resolver((of) => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query(() => [SupplierOutput], { nullable: true })
  getAllSuppliers() {
    this.logger.log('getAll');
    return this.supplierService.getAll();
  }
  @Query(() => SupplierOutput)
  getSupplier(
    @Args('getOneSupplierInput') getOneSupplierInput: DeleteSupplierInput,
  ) {
    this.logger.log('getOneSupplier');
    return this.supplierService.getOne(getOneSupplierInput);
  }
  @Mutation(() => SupplierOutput)
  createSupplier(
    @Args('createSupplierInput') createSupplierInput: SupplierInput,
  ) {
    this.logger.log('create');
    return this.supplierService.create(createSupplierInput);
  }
  @Mutation(() => SupplierOutput)
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: SupplierInput,
  ) {
    this.logger.log('update');
    return this.supplierService.update(updateSupplierInput);
  }
  @Mutation(() => Response)
  deleteSupplier(
    @Args('deleteSupplierInput') deleteSupplierInput: DeleteSupplierInput,
  ) {
    this.logger.log('delete');
    return this.supplierService.delete(deleteSupplierInput);
  }
}
