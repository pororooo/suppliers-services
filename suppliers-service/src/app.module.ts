import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupplierController } from './app.controller';
import { SupplierService } from './app.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [SupplierController],
  providers: [
    {
      provide: 'GrpcSupplierService',
      useFactory: (
        configService: ConfigService,
        supplierService: SupplierService,
      ) => {
        // const supplierOptions = configService.get().supplierService;
        // return ClientProxyFactory.create(supplierOptions);
      },
    },
  ],
})
export class AppModule {}
