import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { SupplierInput } from './model/supplierInput.model';
import { ClientGrpc } from '@nestjs/microservices';
import { SupplierGrpcClientInterface } from './interfaces/supplier.interface';
import { Response } from './model/response.entity';
import { DeleteSupplierInput } from './model/deleteSupplierInput.model';
@Injectable()
export class SupplierService implements OnModuleInit {
  private supplierService: SupplierGrpcClientInterface;
  private readonly logger = new Logger(SupplierService.name);
  constructor(@Inject('SUPPLIER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit(): any {
    this.supplierService =
      this.client.getService<SupplierGrpcClientInterface>('SupplierService');
  }
  async create(createSupplierInput: SupplierInput): Promise<any> {
    return new Promise((res, rej) => {
      const createSupplier = this.supplierService.create(createSupplierInput);
      createSupplier.subscribe({
        next: (data) => {
          res(data);
        },
        error: (error) => {
          rej(error);
        },
      });
    });
  }

  async update({
    vatNumber,
    name,
    country,
    roles,
    sector,
    certificateLink,
  }: SupplierInput): Promise<Response> {
    return new Promise((res, rej) => {
      const updateSupplier = this.supplierService.update({
        vatNumber,
        name,
        country,
        roles,
        sector,
        certificateLink,
      });
      updateSupplier.subscribe({
        next: (data) => {
          this.logger.log(data);
          res(data);
        },
        error: (error) => {
          rej(error);
        },
      });
    });
  }

  async delete({ vatNumber }: DeleteSupplierInput): Promise<Response> {
    return new Promise((res, rej) => {
      const deleteSupplier = this.supplierService.delete({
        vatNumber,
      });
      deleteSupplier.subscribe({
        next: (data) => {
          this.logger.log(data);
          res(data);
        },
        error: (error) => {
          rej(error);
        },
      });
    });
  }

  async getAll(): Promise<any> {
    return new Promise((res, rej) => {
      const allSuppliers = this.supplierService.findAll({});
      allSuppliers.subscribe({
        next: (data) => {
          this.logger.log(data);
          res(data.suppliers);
        },
        error: (error) => {
          rej(error);
        },
      });
    });
  }
  async getOne({ vatNumber }: DeleteSupplierInput): Promise<Response> {
    this.logger.log(vatNumber);
    return new Promise((res, rej) => {
      const oneSupplier = this.supplierService.findByVatNumber({ vatNumber });
      oneSupplier.subscribe({
        next: (data) => {
          this.logger.log(data);
          res(data);
        },
        error: (error) => {
          rej(error);
        },
      });
    });
  }
}
