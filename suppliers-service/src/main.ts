import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    name: 'SUPPLIER_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'supplier',
      protoPath: join(__dirname, '../src/grpc/proto/supplier.proto'),
    },
  });

  await app.startAllMicroservices();

}
bootstrap();


