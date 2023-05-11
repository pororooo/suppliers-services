import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino'
import { LoggerService, INestMicroservice } from '@nestjs/common'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'supplier',
      protoPath: join(__dirname, '../proto/supplier.proto'),
    },
  });

  await app.startAllMicroservices();

}
bootstrap();


