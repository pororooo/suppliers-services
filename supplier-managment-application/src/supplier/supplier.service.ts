import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { SupplierInput } from './model/supplierInput.model';
import { ClientGrpc } from '@nestjs/microservices';
import { SupplierGrpcClientInterface } from './interfaces/supplier.interface';
import { Response } from './model/response.entity';
import { DeleteSupplierInput } from './model/deleteSupplierInput.model';
import { SupplierOutput } from './model/supplierOutput.model';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService implements OnModuleInit {
  private supplierService: SupplierGrpcClientInterface;
  constructor(@Inject('SUPPLIER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit(): any {
    this.supplierService =
      this.client.getService<SupplierGrpcClientInterface>('SupplierService');
  }
  async create(createSupplierInput: SupplierInput) {
    return new Observable<SupplierOutput>((observer) => {
      const createSupplier = this.supplierService.create(createSupplierInput);
      const subscription = createSupplier.subscribe({
        next: (data) => {
          const { vatNumber, ...rest } = data;
          const supplier = { vatNumber: vatNumber.low, ...rest };

          observer.next(supplier);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  async update(updateSupplierInput: SupplierInput) {
    return new Observable<SupplierOutput>((observer) => {
      const updateSupplier = this.supplierService.update(updateSupplierInput);
      const subscription = updateSupplier.subscribe({
        next: (data) => {
          const { vatNumber, ...rest } = data;
          const supplier = { vatNumber: vatNumber.low, ...rest };

          observer.next(supplier);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
  async delete({ vatNumber }: DeleteSupplierInput) {
    return new Observable<Response>((observer) => {
      const deleteSupplier = this.supplierService.delete({ vatNumber });
      const subscription = deleteSupplier.subscribe({
        next: (data) => {
          observer.next(data);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  getAll(): Observable<SupplierOutput[]> {
    return new Observable<SupplierOutput[]>((observer) => {
      const allSuppliers = this.supplierService.findAll({});
      const subscription = allSuppliers.subscribe({
        next: (data) => {
          const suppliers = data.suppliers.map((obj) => {
            const vatNumber = obj.vatNumber.low;
            return {
              ...obj,
              vatNumber,
            };
          });

          observer.next(suppliers);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  async getOne({ vatNumber }: DeleteSupplierInput) {
    return new Observable<SupplierOutput>((observer) => {
      const oneSupplier = this.supplierService.findByVatNumber({ vatNumber });
      const subscription = oneSupplier.subscribe({
        next: (data) => {
          const { vatNumber, ...rest } = data;
          const supplier = { vatNumber: vatNumber.low, ...rest };

          observer.next(supplier);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
