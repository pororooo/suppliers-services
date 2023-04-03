import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UsePipes,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSupplierCommand } from 'src/commands/create-supplier.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSupplierQuery } from 'src/queries/get-supplier.query';
import { UpdateSupplierCommand } from 'src/commands/update-supplier.command';
import { DeleteSupplierCommand } from 'src/commands/delete-supplier.command';
@Controller('supplier')
export class SupplierController {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSupplier(@Body() newSupplier: CreateSupplierCommand) {
    return await this.commandBus.execute(newSupplier);
  }
  @Get('get')
  async getAll() {
    return await this.queryBus.execute(new GetSupplierQuery());
  }
  @Put('update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updatedSupplier: UpdateSupplierCommand) {
    return await this.commandBus.execute(updatedSupplier);
  }
  @Delete('remove')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Body() deletedSupplier: DeleteSupplierCommand) {
    return await this.commandBus.execute(deletedSupplier);
  }
}
