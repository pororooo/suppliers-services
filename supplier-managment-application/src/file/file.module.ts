import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'supplier',
          protoPath: join(__dirname, '../grpc/proto/file.proto'),
          url: 'localhost:5001'
        },
      },
    ]),
  ],
  providers: [ FileResolver, FileService],
})
export class SupplierModule {}
