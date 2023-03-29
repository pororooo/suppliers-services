import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './createSupplier.dto';

export class UpdateDisordersDto extends PartialType(CreateSupplierDto) {
  vat_number: number;
  name: string;
  country: string;
  roles: string;
  sector: string;
  certificate_link: string;
}
