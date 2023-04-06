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
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BasicGuard } from 'src/auth/basic.guard';
import { CreateSupplierCommand } from 'src/commands/impl/create-supplier.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSupplierQuery } from 'src/queries/get-supplier.query';
import { UpdateSupplierCommand } from 'src/commands/impl/update-supplier.command';
import { DeleteSupplierCommand } from 'src/commands/impl/delete-supplier.command';
@Controller('supplier')
@UseGuards(BasicGuard)
export class SupplierController {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  private readonly logger = new Logger(SupplierController.name);
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSupplier(@Body() newSupplier: CreateSupplierCommand) {
    this.logger.log('post suppliers');
    return await this.commandBus.execute(newSupplier);
  }
  @Get('get')
  async getAll() {
    this.logger.log('get suppliers');
    return await this.queryBus.execute(new GetSupplierQuery());
  }
  @Put('update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updatedSupplier: UpdateSupplierCommand) {
    this.logger.log('update supplier');
    return await this.commandBus.execute(updatedSupplier);
  }
  @Delete('remove')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Query() deletedSupplier: DeleteSupplierCommand) {
    this.logger.log('delete supplier');
    return await this.commandBus.execute(deletedSupplier);
  }
}
