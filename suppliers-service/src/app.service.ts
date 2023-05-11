// import { Injectable, Inject } from '@nestjs/common';
// import { SupplierController } from './supplier/supplier.controller';
// import { ClientGrpc } from '@nestjs/microservices';
// import { OnModuleInit } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SupplierService implements OnModuleInit {
//   private appService: SupplierController;

//   constructor(@Inject('SUPPLIER_PACKAGE') private client: ClientGrpc) {}

//   onModuleInit() {
//     this.appService =
//       this.client.getService<SupplierController>('SupplierController');
//   }
// }
