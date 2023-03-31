import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { EventStore } from 'event-sourcing-nestjs/dist';
import { SupplierCreatedEvent } from './supplier-created.event';

@Injectable()
export class SupplierEventStore {
  // @EventStore()
  // events: IEvent[];
  // handleMessageCreatedEvent(event: SupplierCreatedEvent) {
  //   this.events.push(event);
  // }
}
