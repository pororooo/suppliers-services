import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  Put,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import { CreateSupplierDto } from '../dto/createSupplier.dto';
import { SupplierService } from './supplier.service';
import { Supplier } from 'src/entity/supplier.entity';
import { CreateSupplierCommand } from 'src/commands/create-supplier.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('supplier')
export class SupplierController {
  constructor(
    private supplierService: SupplierService,
    private commandBus: CommandBus,
  ) {}

  @Get()
  async getSuppliers(): Promise<Supplier[]> {
    return this.supplierService.getSuppliers();
  }
  @Post()
  async createSupplier(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    const { vat_number, name, country, roles, sector, certificate_link } =
      createSupplierDto;
    const command = new CreateSupplierCommand(
      vat_number,
      name,
      country,
      roles,
      sector,
      certificate_link,
    );
    return this.commandBus.execute(command);
  }
}
