import { Injectable, Inject } from '@nestjs/common';
import { SupplierController } from './app.controller';
import { ClientGrpc } from '@nestjs/microservices';
import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService implements OnModuleInit {
  private appService: SupplierController;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) { }

  onModuleInit() {
    this.appService =
      this.client.getService<SupplierController>('SupplierController');
  }
}