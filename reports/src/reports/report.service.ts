import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { ProductArgs } from './dtos/product-args.dto';

@Injectable()
export class ReportService {
    async findOneById(id: string): Promise<Product> {
        return {
            id: '1234',
            title: 'receita 1',
            description: 'receita 1 desc'
        } as Product;
    }

    async findAll(args: ProductArgs): Promise<Product[]> {
        return [
            {
                id: '1234',
                title: 'receita 1',
                description: 'receita 1 desc'
            }
        ] as Product[];
    }
}