import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/store/entities/product.entity';
import { ProductService } from 'src/modules/store/services/product.service';
import { ProductController } from 'src/modules/store/controllers/product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product
    ])],
    providers: [ProductService],
    controllers: [ProductController],
})
export class StoreModule { }
