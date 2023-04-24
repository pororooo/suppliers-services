import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty } from 'lodash';
import { Body } from '@nestjs/common';
import { SupplierService } from './microservices/suppliers-data-service/src/supplier/supplier.service';


interface SupplierServiceBodyResult {
  supplier: Array<any>;
}
interface FileServiceBodyResult {
  file: Array<any>;
}

interface UsersService {
  findAll(body?: any): Promise<Array<any>>;
}

@Controller()
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);

  constructor(
    @Inject('SupplierService') private readonly supplierService: SupplierService,
  ) {}

  @GrpcMethod('SupplierService', 'findSupplier')
  async getSuppliers(): Promise<any> {
this.logger.log('get')
    return await this.supplierService.getSupplier();
  } 
  //  @GrpcMethod('UsersService', 'findFile')
  // async findFile(@Body() body: any): Promise<FileServiceBodyResult> {
  //   const result: Array<any> = await this.usersService.findAll({
  //     attributes: !isEmpty(body.attributes) ? body.attributes : undefined,
  //     where: !isEmpty(body.where) ? JSON.parse(body.where) : undefined,
  //     order: !isEmpty(body.order) ? JSON.parse(body.order) : undefined,
  //     offset: body.offset ? body.offset : 0,
  //     limit: body.limit ? body.limit : 25,
  //   });

  //   return { file: result };
  // }
}
