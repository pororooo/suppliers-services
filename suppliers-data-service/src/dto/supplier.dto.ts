import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class supplierDto {
  @IsNumber()
  @IsNotEmpty()
  vat_number: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  roles: string;

  @IsString()
  @IsNotEmpty()
  sector: string;

  @IsString()
  @IsNotEmpty()
  certificate_link: string;
}
