import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class supplierDto {
  @IsNumber()
  @IsNotEmpty()
  vat_number: number;

  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  roles: string;

  @IsString()
  sector: string;

  @IsString()
  certificate_link: string;
}
