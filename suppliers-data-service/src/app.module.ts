import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/models/supplier.model';
import { SupplierModule } from './supplier/supplier.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      username: 'postgres',
      host: 'localhost',
      database: 'suppliers',
      password: 'root',
      port: 5432,
      type: 'postgres',
      entities: [Supplier],
      synchronize: true,
    }),
    AuthModule,
    SupplierModule,
  ],
})
export class AppModule {}
