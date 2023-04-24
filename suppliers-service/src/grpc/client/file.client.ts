import { ClientGrpc, Transport, Client } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common/decorators';
import { join } from 'path';
import { OnModuleInit, Logger } from '@nestjs/common';
import { FileService } from '../server/file.service';

@Injectable()
export class GrpcClientFile implements OnModuleInit {
  private readonly logger = new Logger(GrpcClientFile.name);

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'file',
      protoPath: join(__dirname, '../proto/file.proto'),
    },
  })
  
  client: ClientGrpc;

  private fileService: FileService;
  private grpcService: any;//send a request to the remote server

  onModuleInit() {
    this.fileService =
      this.client.getService<FileService>('File');
  }

  
}
