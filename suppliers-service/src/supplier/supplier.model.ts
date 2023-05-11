import * as paginate from 'sequelize-cursor-pagination'
import { Model } from 'sequelize-typescript'
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Supplier extends Model<Supplier> {
    
    @Field((type) => Int)
    vat_number: number;
  
    @Field()
    name: string;
  
    @Field()
    country: string;
  
    @Field()
    roles: string;
  
    @Field()
    sector: string;
  
    @Field()
    certificate_link: string;
}  
// paginate({
//   methodName: 'findAndPaginate',
//   keyField: 'vat_number'
// })(Supplier)