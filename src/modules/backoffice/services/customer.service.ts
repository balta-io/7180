import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }

    async find(document): Promise<Customer> {
        return await this.model.findOne({ document }).exec();
    }

    async findAll(): Promise<Customer[]> {
        return await this.model.find({}, 'firstName lastName name email document').exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model.find(model.query, model.fields, { skip: model.skip, limit: model.take }).exec();
    }

    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data,
            },
        }, options);
    }
}
