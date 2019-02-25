import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private readonly repository: Repository<OrderItem>,
    ) { }

    async post(item: OrderItem) {
        await this.repository.save(item);
    }
}