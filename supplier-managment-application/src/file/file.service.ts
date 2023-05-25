import { Injectable } from '@nestjs/common/decorators';
import { FileOutput } from 'src/file/model/fileOutput.model';
import fetch from 'node-fetch';

@Injectable()
export class FileService {
  async getFileInfo({ supplierName, path }): Promise<FileOutput> {
    try {
      const response = await fetch('http://localhost:3001/files');
      const data = await response.json();
      let dataBySupplierName = data;
      if (supplierName) {
        dataBySupplierName = data.find(
          (obj: { supplierName: string }) => obj.supplierName === supplierName,
        );
      }
      path = [dataBySupplierName].map(
        (item: { path: string; fileName: string }) =>
          `${item.path}\\${item.fileName}`,
      ).join();
      const result = { supplierName, path };
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
  async sendFilePath(data: FileOutput): Promise<FileOutput> {
    return data;
  }
}
