import { Observable } from 'rxjs';

export interface SupplierGrpcClientInterface {
  findAll(data: {}): Observable<any>;

  findByVatNumber(data: { vat_number: number }): Observable<any>;

  create(data: {
    vat_number: number;
    country: string;
    name: string;
    roles: string;
    sector: string;
    certificate_link: string;
  }): Observable<any>;

  update(data: {
    vat_number: number;
    country: string;
    name: string;
    roles: string;
    sector: string;
    certificate_link: string;
  }): Observable<any>;

  delete(data: { vat_number: number }): Observable<any>;
}
