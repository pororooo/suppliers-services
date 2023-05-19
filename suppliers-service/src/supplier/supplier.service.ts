import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
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
        this.logger.log({ ...res.data });
        return { ...res.data };
      })
      .catch((error) => {
        this.logger.log(error);
        return error;
      });

    return supplierResponce;
  }

  async findByVatNumber(data: any): Promise<any> {
    const supplierResponce = await axios
      .get(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/getone?vat_number=${data.vatNumber.low}`,
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        this.logger.log({ ...res.data });
        return { ...res.data };
      })
      .catch((error) => {
        this.logger.log(error);
        return error;
      });

    return supplierResponce;
  }

  async createSupplier(data: any): Promise<any> {
    this.logger.log(
      `${this.configService.get<string>(
        'SUPPLIERS_DATA_SERVICE_URL',
      )}/supplier/add`,
    );
    this.logger.log(data);
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
        return error;
      });

    return supplierResponce;
  }

  async updateSupplier(data: any): Promise<any> {
    const supplierResponce = await axios
      .put(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/update?vat_number=${data.vatNumber.low}`,
        {
          vat_number: data.vatNumber.low,
          name: data.name,
          country: data.country,
          roles: data.roles,
          sector: data.sector,
          certificate_link: data.certificateLink,
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
        return error;
      });

    return supplierResponce;
  }

  async deleteSupplier(data: any) {
    this.logger.log(data)
    const supplierResponce = await axios
      .delete(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/remove?vat_number=${data.vatNumber.low}`,
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
        return error;
      });

    return supplierResponce;
  }
}
