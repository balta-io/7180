import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Product } from './models/product.model';
import { ReportService } from './report.service';
import { ProductArgs } from './dtos/product-args.dto';

// const pubSub = new PubSub();

@Resolver(of => Product)
export class ReportsResolver {
    constructor(private readonly service: ReportService) { }

    @Query(returns => Product)
    async product(@Args('id') id: string): Promise<Product> {
        const product = await this.service.findOneById(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Query(returns => [Product])
    products(@Args() args: ProductArgs): Promise<Product[]> {
        return this.service.findAll(args);
    }
}