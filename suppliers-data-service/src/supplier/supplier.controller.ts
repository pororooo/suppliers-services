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
import { UpdateSupplierCommand } from 'src/commands/impl/update-supplier.command';
import { DeleteSupplierCommand } from 'src/commands/impl/delete-supplier.command';
import { SupplierService } from './supplier.service';
import { supplierDto } from 'src/dto/supplier.dto';
import { CommandBus } from '@nestjs/cqrs/dist';
@Controller('supplier')
@UseGuards(BasicGuard)
export class SupplierController {
  constructor(
    private readonly service: SupplierService,
    private commandBus: CommandBus,
  ) {}
  private readonly logger = new Logger(SupplierController.name);
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSupplier(@Body() newSupplier: supplierDto): Promise<supplierDto> {
    this.logger.log('post suppliers');
    return await this.service.createSupplier({ ...newSupplier });
  }
  @Get('get')
  async getAll() {
    this.logger.log('get suppliers');
    return await this.service.getSupplier();
  }
  @Put('update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updatedSupplier: supplierDto) {
    this.logger.log('update supplier');
    return await this.service.updateSupplier(updatedSupplier);
  }
  @Delete('remove')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Query() deletedSupplier: DeleteSupplierCommand) {
    this.logger.log('delete supplier');
    return await this.service.deleteSupplier(deletedSupplier);
  }
}
