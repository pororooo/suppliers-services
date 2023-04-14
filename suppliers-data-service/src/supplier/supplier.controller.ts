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
import { DeleteSupplierCommand } from 'src/commands/impl/delete-supplier.command';
import { SupplierService } from './supplier.service';
import { supplierDto } from 'src/dto/supplier.dto';
@Controller('supplier')
@UseGuards(BasicGuard)
export class SupplierController {
  constructor(private readonly service: SupplierService) {}
  private readonly logger = new Logger(SupplierController.name);
  @Post('add')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSupplier(@Body() newSupplier: supplierDto): Promise<supplierDto> {
    this.logger.log('post request');
    return await this.service.createSupplier({ ...newSupplier });
  }
  @Get('get')
  async getAll() {
    this.logger.log('get request');
    return await this.service.getSupplier();
  }
  @Put('update')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updatedSupplier: supplierDto) {
    this.logger.log('put request');
    return await this.service.updateSupplier(updatedSupplier);
  }
  @Delete('remove')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Query() deletedSupplier: DeleteSupplierCommand) {
    this.logger.log('delete request');
    return await this.service.deleteSupplier(deletedSupplier);
  }
}
