import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

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

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50052',
      package: 'file',
      protoPath: join(__dirname, 'file.proto'),
    },
  });

  await app.startAllMicroservices();

  // await app.listen(3000);
}
bootstrap();
