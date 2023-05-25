import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileService } from './file.service';
import { Injectable, Logger } from '@nestjs/common';
import { FileOutput } from '../file/model/fileOutput.model';
import { FileInput } from '../file/model/fileinput.model';

@Injectable()
@Resolver((of) => FileInput)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}
  private readonly logger = new Logger(FileResolver.name);

  @Query(() => FileOutput)
  async getFileInfo(
    @Args('supplierName', { nullable: true }) supplierName: string,
    @Args('path', { nullable: true }) path: string,
  ): Promise<FileOutput> {
    const data = await this.fileService.getFileInfo({
      supplierName,
      path,
    });
    this.logger.log(data);
    return data;
  }
  @Mutation(() => FileOutput)
  async sendFileName(
    @Args('fileName') fileinput: FileInput,
  ): Promise<FileOutput> {
    this.logger.log('mutation');
    const result = await this.fileService.sendFilePath(fileinput);
    this.logger.log(result);
    return result;
  }
}
