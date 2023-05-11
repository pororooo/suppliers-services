import { Injectable } from '@nestjs/common';
import { Supplier } from './supplier.model';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { GetSupplierDto } from './dto/getSupplier.dto';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';
import { DeleteSupplierDto } from './dto/deleteSupplier.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupplierService {
  constructor(private readonly configService: ConfigService) {}

  async findAll() {
    const supplierResponce = await axios
      .get(this.configService.get<string>('SUPPLIERS_DATA_SERVICE_URL'), {
        headers: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      })
      .then((res) => {
        return { ...res.data };
      });

    return supplierResponce;
  }

  async findByVatNumber(data: GetSupplierDto): Promise<any> {
    const supplierResponce = await axios
      .get(this.configService.get<string>('SUPPLIERS_DATA_SERVICE_URL'), {
        headers: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      })
      .then((res) => {
        return { ...res.data };
      });

    return supplierResponce;
  }

  async createSupplier(data: CreateSupplierDto): Promise<Supplier> {
    const supplierResponce = await axios
      .get(this.configService.get<string>('SUPPLIERS_DATA_SERVICE_URL'), {
        headers: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      })
      .then((res) => {
        return res.data;
      });

    return supplierResponce;
  }

  async updateSupplier(data: UpdateSupplierDto): Promise<Supplier> {
    const supplierResponce = await axios
      .get(this.configService.get<string>('SUPPLIERS_DATA_SERVICE_URL'), {
        headers: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      })
      .then((res) => {
        return res.data;
      });

    return supplierResponce;
  }

  async deleteSupplier(data: DeleteSupplierDto) {
    const supplierResponce = await axios
      .get(this.configService.get<string>('SUPPLIERS_DATA_SERVICE_URL'), {
        headers: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      })
      .then((res) => {
        return res.data;
      });

    return supplierResponce;
  }
}
