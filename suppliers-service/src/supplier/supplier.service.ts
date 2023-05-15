import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { GetSupplierDto } from './dto/getSupplier.dto';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';
import { DeleteSupplierDto } from './dto/deleteSupplier.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Status } from './dto/statusResponce.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class SupplierService {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(SupplierService.name);

  async findAll() {
    const supplierResponce = await axios
      .get(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/get`,
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        return { ...res.data };
      });

    return supplierResponce;
  }

  async findByVatNumber(data: GetSupplierDto): Promise<any> {
    const supplierResponce = await axios
      .get(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/get`,
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        return { ...res.data };
      });

    return supplierResponce;
  }

  async createSupplier(data: CreateSupplierDto): Promise<any> {
    this.logger.log(`${this.configService.get<string>(
      'SUPPLIERS_DATA_SERVICE_URL',
    )}/supplier/add`);
    const supplierResponce = await axios
      .post(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/add`,
        {
          vat_number: data.vat_number,
          name: data.name,
          country: data.country,
          roles: data.roles,
          sector: data.sector,
          certificate_link: data.certificate_link,
        },
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        this.logger.log(error)
        return error;
      });

    return supplierResponce;
  }

  async updateSupplier(data: UpdateSupplierDto): Promise<Status> {
    const supplierResponce = await axios
      .put(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/update?vat_number=${data.vat_number}`,
        {
          vat_number: data.vat_number,
          name: data.name,
          country: data.country,
          roles: data.roles,
          sector: data.sector,
          certificate_link: data.certificate_link,
        },
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        return res.status;
      })
      .catch((error) => {
        return error;
      });

    return supplierResponce.status;
  }

  async deleteSupplier(data: DeleteSupplierDto) {
    const supplierResponce = await axios
      .delete(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/remove?vat_number=${data.vat_number}`,
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        return res.data;
      });

    return supplierResponce;
  }
}
