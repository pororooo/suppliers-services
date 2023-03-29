import { Controller, Post, Get, Put, Delete, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSupplierCommand } from './commands/create-supplier.command';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly supplierService: SupplierService,
  ) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const command = new CreateSupplierCommand(
      createSupplierDto.vat_number,
      createSupplierDto.name,
      createSupplierDto.country,
      createSupplierDto.roles,
      createSupplierDto.sector,
      createSupplierDto.certificate_link,
    );
    return this.commandBus.execute(command);
  }
}
