import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entity/supplier.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
