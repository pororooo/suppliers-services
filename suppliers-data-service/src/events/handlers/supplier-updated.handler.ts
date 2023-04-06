// import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
// import { SupplierCreatedEvent } from '../impl/supplier-created.event';
// import { Logger } from '@nestjs/common';
// import { SupplierRepository } from 'src/supplier/supplier.repository';

// @EventsHandler(SupplierCreatedEvent)
// export class SupplierCreatedHandler implements IEventHandler<SupplierCreatedEvent> {
//   constructor(private readonly supplierRepository: SupplierRepository) {}

//   async handle(event: SupplierCreatedEvent) {
//     Logger.log((JSON.stringify(event), 'SupplierCreatedEvent'));

//     const id = event.supplierDto.;
//     await this.supplierRepository.updateOne(id, { status: 'DELIVERED' });
//   }
// }
