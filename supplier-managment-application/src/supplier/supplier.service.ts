import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { CreateSupplierInput } from './model/createSupplierInput.model';
import { ClientGrpc } from '@nestjs/microservices';
import { SupplierGrpcClientInterface } from './interfaces/supplier.interface';
import { UpdateSupplierInput } from './model/updateSupplierInput.model';
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
  async create({
    vat_number,
    name,
    country,
    roles,
    sector,
    certificate_link,
  }: CreateSupplierInput): Promise<Response> {
    return new Promise((res, rej) => {
      this.logger.log(
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
      );
      const createSupplier = this.supplierService.create({
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
      });
      createSupplier.subscribe({
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

  async update({
    vat_number,
    name,
    country,
    roles,
    sector,
    certificate_link,
  }: UpdateSupplierInput): Promise<Response> {
    return new Promise((res, rej) => {
      const updateSupplier = this.supplierService.update({
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
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

  async delete({ vat_number }: DeleteSupplierInput): Promise<Response> {
    return new Promise((res, rej) => {
      const deleteSupplier = this.supplierService.delete({
        vat_number,
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

  async getAll(): Promise<Response> {
    return new Promise((res, rej) => {
      const allSuppliers = this.supplierService.findAll({});
      allSuppliers.subscribe({
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
  async getOne(vat_number: number): Promise<Response> {
    return new Promise((res, rej) => {
      const oneSupplier = this.supplierService.findByVatNumber({ vat_number });
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
