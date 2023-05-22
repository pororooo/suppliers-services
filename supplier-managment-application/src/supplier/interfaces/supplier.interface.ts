import { Observable } from 'rxjs';

export interface SupplierGrpcClientInterface {
  findAll(data: {}): Observable<any>;

  findByVatNumber(data: { vatNumber: number }): Observable<any>;

  create(data: {
    vatNumber: number;
    country: string;
    name: string;
    roles: string;
    sector: string;
    certificateLink: string;
  }): Observable<any>;

  update(data: {
    vatNumber: number;
    country: string;
    name: string;
    roles: string;
    sector: string;
    certificateLink: string;
  }): Observable<any>;

  delete(data: { vatNumber: number }): Observable<any>;
}
