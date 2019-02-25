import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/store/entities/product.entity';
import { ProductService } from 'src/modules/store/services/product.service';
import { ProductController } from 'src/modules/store/controllers/product.controller';
import { Order } from 'src/modules/store/entities/order.entity';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';
import { OrderService } from 'src/modules/store/services/order.service';
import { OrderController } from 'src/modules/store/controllers/order.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem
    ])],
    providers: [
        ProductService,
        OrderService,
        OrderItemService
    ],
    controllers: [
        ProductController,
        OrderController
    ],
})
export class StoreModule { }
