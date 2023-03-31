import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './createSupplier.dto';

export class GetSupplierDto extends PartialType(CreateSupplierDto) {
  vat_number: number;
}
