import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupplierModule,
  ],
})
export class AppModule {}
