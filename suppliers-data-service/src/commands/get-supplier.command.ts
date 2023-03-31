import { ICommand } from '@nestjs/cqrs';

export class GetSupplierCommand implements ICommand {
  constructor(
    public readonly vat_number: number,
    public readonly name: string,
    public readonly country: string,
    public readonly roles: string,
    public readonly sector: string,
    public readonly certificate_link: string,
  ) {}
}
