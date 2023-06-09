import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { GetSupplierDto } from './dto/getSupplier.dto';
import { Status } from './dto/statusResponse.dto';
import { CreateSupplierDto } from './dto/createSupplier.dto';
import { UpdateSupplierDto } from './dto/updateSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly configService: ConfigService) {}

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

    const suppliers = modifiedArray.map((obj) => {
      return {
        vatNumber: obj.vat_number,
        name: obj.name,
        country: obj.country,
        roles: obj.roles,
        sector: obj.sector,
        certificateLink: obj.certificate_link,
      };
    });

    return { suppliers };
  }

  async findByVatNumber(data: any): Promise<GetSupplierDto> {
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
        const suppliers = {
          vatNumber: res.data.vat_number,
          name: res.data.name,
          country: res.data.country,
          roles: res.data.roles,
          sector: res.data.sector,
          certificateLink: res.data.certificate_link,
        };
        return suppliers;
      })
      .catch((error) => {
        return error;
      });

    return supplierResponce;
  }

  async createSupplier(data: any): Promise<CreateSupplierDto> {
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
        const suppliers = {
          vatNumber: res.data.vat_number,
          name: res.data.name,
          country: res.data.country,
          roles: res.data.roles,
          sector: res.data.sector,
          certificateLink: res.data.certificate_link,
        };
        return suppliers;
      })
      .catch((error) => {
        return error;
      });

    return supplierResponce;
  }

  async updateSupplier(data: any): Promise<UpdateSupplierDto> {
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
        const suppliers = {
          vatNumber: res.data.vat_number,
          name: res.data.name,
          country: res.data.country,
          roles: res.data.roles,
          sector: res.data.sector,
          certificateLink: res.data.certificate_link,
        };
        return suppliers;
      })
      .catch((error) => {
        return error;
      });

    return supplierResponce;
  }

  async deleteSupplier(data: any): Promise<Status> {
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
        return res;
      })
      .catch((error) => {
        return error;
      });
    return supplierResponce;
  }
}
