import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Supplier extends AggregateRoot {
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
}
