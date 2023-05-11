export class CreateSupplierDto {
  readonly vat_number: number;
  readonly name: string;
  readonly country: string;
  readonly roles: string;
  readonly sector: string;
  readonly certificate_link: string;
}
