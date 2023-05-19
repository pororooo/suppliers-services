import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateSupplierInput } from './model/createSupplierInput.model';
import { Injectable, Logger } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { SupplierService } from './supplier.service';
import { UpdateSupplierInput } from './model/updateSupplierInput.model';
import { Supplier } from './model/supplier.entity';
import { Response } from './model/response.entity';
import { DeleteSupplierInput } from './model/deleteSupplierInput.model';

@Injectable()
@Resolver((of) => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}
  private readonly logger = new Logger(SupplierResolver.name);

  @Query(() => SupplierOutput)
   getAllSuppliers() {
    this.logger.log('getAll');
    return this.supplierService.getAll();
  }
  @Query(() => SupplierOutput)
   getSupplier(@Args('vat_number') vat_number: number) {
    this.logger.log('getOneSupplier');
    return this.supplierService.getOne(vat_number);
  }
  @Mutation(() => Response)
   createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    this.logger.log('create');
    return this.supplierService.create(createSupplierInput);
  }
  @Mutation(() => Response)
   updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ) {
    this.logger.log('update');
    return this.supplierService.update(updateSupplierInput);
  }
  @Mutation(() => Response)
   deleteSupplier(@Args('deleteSupplierInput') deleteSupplierInput: DeleteSupplierInput) {
    this.logger.log('delete');
    return this.supplierService.delete(deleteSupplierInput);
  }
}
