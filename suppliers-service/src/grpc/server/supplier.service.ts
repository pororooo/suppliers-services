import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SupplierInput } from '../model/supplierInput.model';
import { SupplierOutput } from '../model/supplierOutput.model';

@Controller()
export class SupplierGrpcService {
  @GrpcMethod('GrpcSupplierService', 'CreateSupplier')
  sendData(data: SupplierInput, error: any): SupplierOutput {
    // process the data and return the SupplierOutput
    const result: SupplierOutput = {
      vat_number: 0,
      name: '',
      country: '',
      roles: '',
      sector: '',
      certificate_link: '',
      file_name: '',
      file_type: ''
    };
    return result;
  }
}