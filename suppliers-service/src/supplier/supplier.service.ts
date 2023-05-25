import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GetSupplierDto } from './dto/getSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(SupplierService.name);

  async findAll(): Promise<any> {
    const supplierResponce = await axios.get(
      `${this.configService.get<string>(
        'SUPPLIERS_DATA_SERVICE_URL',
      )}/supplier/get`,
      {
        auth: {
          username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
          password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
        },
      },
    );
    const response = { data: supplierResponce.data, error: false };
    const modifiedArray = response.data.map((supplier) => {
      return { ...supplier };
    });

    const suppliers = modifiedArray.map(obj => {
      return {
        vatNumber: obj.vat_number,
        name: obj.name,
        country: obj.country,
        roles: obj.roles,
        sector: obj.sector,
        certificateLink: obj.certificate_link
      };
    });

    this.logger.log(suppliers);
    return { suppliers };
  }

  async findByVatNumber(data: any): Promise<any> {
    const supplierResponce = await axios
      .get(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/getone?vat_number=${String(data.vatNumber)}`,
        {
          auth: {
            username: this.configService.get<string>('HTTP_BASIC_USERNAME'),
            password: this.configService.get<string>('HTTP_BASIC_PASSWORD'),
          },
        },
      )
      .then((res) => {
        const transformedObj: any = {};

        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const transformedKey = key.replace(/_(\w)/g, (_, char) =>
              char.toUpperCase(),
            );
            transformedObj[transformedKey] = res.data[key];
          }
        }
        this.logger.log({ ...transformedObj });
        return { ...transformedObj };
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
    this.logger.log(
      String(data.vatNumber),
      data.name,
      data.country,
      data.roles,
      data.sector,
      data.certificateLink,
    );
    const supplierResponce = await axios
      .post(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/add`,
        {
          vat_number: Number(String(data.vatNumber)),
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
        return res.status;
      })
      .catch((error) => {
        this.logger.log(error);
        return error;
      });

    return supplierResponce;
  }

  async updateSupplier(data: any): Promise<any> {
    const supplierResponce = await axios
      .put(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/update?vat_number=${String(data.vatNumber)}`,
        {
          vat_number: Number(String(data.vatNumber)),
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

  async deleteSupplier(data: any): Promise<any> {
    this.logger.log(data);
    const supplierResponce = await axios
      .delete(
        `${this.configService.get<string>(
          'SUPPLIERS_DATA_SERVICE_URL',
        )}/supplier/remove?vat_number=${String(data.vatNumber)}`,
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
