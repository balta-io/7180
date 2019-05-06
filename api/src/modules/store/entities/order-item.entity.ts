import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from 'src/modules/store/entities/product.entity';
import { Order } from 'src/modules/store/entities/order.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (o) => o.items)
    order: Order;

    @ManyToOne(() => Product, (p) => p)
    product: Product;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
}