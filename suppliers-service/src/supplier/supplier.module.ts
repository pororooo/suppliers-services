import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { SequelizeModule } from '@nestjs/sequelize'

import { Supplier } from './supplier.model'
import { SupplierController } from './supplier.controller'
import { SupplierService } from './supplier.service'

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Supplier])],
  providers: [{ provide: 'SupplierService', useClass: SupplierService }],
  controllers: [SupplierController]
})
export class SupplierModule {}