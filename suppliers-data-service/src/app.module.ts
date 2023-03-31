import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';
import { SupplierModule } from './supplier/supplier.module';
@Module({
  imports: [
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
    SupplierModule,
  ],
})
export class AppModule {}
