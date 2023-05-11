import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupplierController } from './supplier/supplier.controller';

@Module({
  imports: [ConfigModule],
  controllers: [SupplierController],
  providers: [
    {
      provide: 'GrpcSupplierService',
      useFactory: (configService: ConfigService) => {},
    },
  ],
})
export class AppModule {}
