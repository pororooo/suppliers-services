import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SupplierModule } from './supplier/supplier.module';
import { join } from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      csrfPrevention: false,
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    SupplierModule,
    FileModule,
  ],
})
export class AppModule {}
