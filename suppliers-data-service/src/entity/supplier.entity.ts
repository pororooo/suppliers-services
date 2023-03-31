import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
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
