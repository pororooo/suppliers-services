import { AggregateRoot } from '@nestjs/cqrs';
import { SupplierCreatedEvent } from 'src/events/impl/supplier-created.event';
import { SupplierDeletedEvent } from 'src/events/impl/supplier-deleted.event';
import { SupplierUpdatedEvent } from 'src/events/impl/supplier-updated.event';
import { Entity, Column, PrimaryColumn } from 'typeorm';

// @ObjectType() graphql
@Entity()
export class Supplier extends AggregateRoot {
  [x: string]: any;
  //   constructor(private vat_number: number) {
  //     super();
  //   }

  @PrimaryColumn()
  vat_number: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  roles: string;

  @Column()
  sector: string;

  @Column()
  certificate_link: string;

  setData(data: any) {
    this.data = data;
  }
  createSupplier() {
    this.apply(
      new SupplierCreatedEvent(
        this.vat_number,
        this.name,
        this.country,
        this.roles,
        this.sector,
        this.certificate_link,
      ),
    );
  }
  updateSupplier() {
    this.apply(
      new SupplierUpdatedEvent(
        this.vat_number,
        this.name,
        this.country,
        this.roles,
        this.sector,
        this.certificate_link,
      ),
    );
  }
  deleteSupplier() {
    this.apply(new SupplierDeletedEvent(this.vat_number));
  }
}
