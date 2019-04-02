import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from '../models/customer.model';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
        @InjectModel('User') private readonly userModel: Model<User>
    ) { }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async findByUsername(username): Promise<User> {
        return await this.userModel
            .findOne({ username: username })
            .exec();
    }

    async update(username: string, data: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    async authenticate(username, password): Promise<Customer> {
        return await this.customerModel
            .findOne(
                {
                    'user.username': username,
                    'user.password': password
                }
            )
            .populate('user', '-password')
            .exec();
    }
}
