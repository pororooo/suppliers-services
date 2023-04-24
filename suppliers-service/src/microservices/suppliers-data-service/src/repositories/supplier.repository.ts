import { Injectable } from '@nestjs/common';
import { supplierDto } from 'src/dto/supplier.dto';
import { Supplier } from 'src/entity/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierRepository extends Repository<Supplier> {}
