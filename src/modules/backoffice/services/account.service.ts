import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    constructor(@InjectModel('User') private readonly model: Model<User>) { }

    // Cria um novo usuário
    async create(data: User): Promise<User> {
        const user = new this.model(data);
        return await user.save();
    }
}
