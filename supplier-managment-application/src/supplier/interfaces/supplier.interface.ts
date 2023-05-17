import { Observable } from 'rxjs';

export interface SupplierGrpcClientInterface {
  createSupplier(data: {
    vat_number: number;
    country: string;
    name: string;
    vatNumber: number;
    roles: string;
    sectors: string;
    certificate_link: string;
  }): Observable<any>;

  updateSupplier(data: {
    vat_number: number;
    country: string;
    name: string;
    vatNumber: number;
    roles: string;
    sectors: string;
    certificate_link: string;
  }): Observable<any>;

  deleteSupplier(data: { vat_number: number }): Observable<any>;

  GetSuppliers(data: {}): Observable<any>;

  GetOneSupplier(data: { vat_number: number }): Observable<any>;
}
