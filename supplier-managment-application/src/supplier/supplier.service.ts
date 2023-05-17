import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { SupplierOutput } from './model/supplierOutput.model';
import { CreateSupplierInput } from './model/createSupplierInput.model';
import { ClientGrpc } from '@nestjs/microservices';
import { SupplierGrpcClientInterface } from './interfaces/supplier.interface';
@Injectable()

export class SupplierService implements OnModuleInit{
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
  }: CreateSupplierInput): Promise<SupplierOutput> {

  }

  async update(): Promise<SupplierOutput> {
    
  }
  async delete(): Promise<SupplierOutput> {
    
  }

  async getAll(): Promise<SupplierOutput> {
    
  }

  async getOne(): Promise<SupplierOutput> {
    
  }


}
