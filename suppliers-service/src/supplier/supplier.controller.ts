import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SupplierService } from './supplier.service';
import { GetSupplierDto } from './dto/getSupplier.dto';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';
import { DeleteSupplierDto } from './dto/deleteSupplier.dto';
import { Status } from './dto/statusResponce.dto';

@Controller()
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);

  constructor(
    private readonly supplierService: SupplierService,
  ) {}

  @GrpcMethod('SupplierService', 'findAll')
  async findAll(): Promise<Status> {
    this.logger.log('getData');
    return await this.supplierService.findAll();
  }

  @GrpcMethod('SupplierService', 'findByVatNumber')
  async findByVatNumber(data: GetSupplierDto): Promise<Status> {
    this.logger.log('getData');
    return await this.supplierService.findByVatNumber(data);
  }

  @GrpcMethod('SupplierService', 'create')
  async create(data: CreateSupplierDto): Promise<any> {
    this.logger.log('getData');
    return await this.supplierService.createSupplier(data);
  }

  @GrpcMethod('SupplierService', 'update')
  async update(data: UpdateSupplierDto): Promise<any> {
    this.logger.log('getData');
    return await this.supplierService.updateSupplier(data);
  }

  @GrpcMethod('SupplierService', 'delete')
  async delete(data: DeleteSupplierDto): Promise<any> {
    this.logger.log('getData');
    return await this.supplierService.deleteSupplier(data);
  }
}
