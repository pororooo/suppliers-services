import { Injectable } from '@nestjs/common';
import { CreateSupplierCommand } from './commands/create-supplier.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSupplierQuery } from './queries/get-supplier.query';

@Injectable()
export class SupplierService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSupplier(supplierData: any): Promise<any> {
    const { vat_number, name, country, roles, sector, certificate_link } =
      supplierData;
    const supplier = await this.commandBus.execute(
      new CreateSupplierCommand(
        vat_number,
        name,
        country,
        roles,
        sector,
        certificate_link,
      ),
    );
    return supplier;
  }

  //   async getSupplier(vat_number: number): Promise<any> {
  //     const supplier = await this.queryBus.execute(
  //       new GetSupplierQuery(vat_number),
  //     );
  //     return supplier;
  //   }
  //   async updateSupplier(vat_number: number): Promise<any> {
  //     const supplier = await this.queryBus.execute(
  //       new GetSupplierQuery(vat_number),
  //     );
  //     return supplier;
  //   }
  //   async deleteSupplier(vat_number: number): Promise<any> {
  //     const supplier = await this.queryBus.execute(
  //       new GetSupplierQuery(vat_number),
  //     );
  //     return supplier;
  //   }
}
