import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Pet } from 'src/modules/backoffice/models/pet.model';

@Injectable()
export class PetService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(document: string, data: Pet): Promise<Customer> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ document }, {
            $push: {
                pets: data,
            },
        }, options);
    }

    async update(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document, 'pets._id': id }, {
            $set: {
                'pets.$': data,
            },
        });
    }

    // async remove(document: string, id: string): Promise<Customer> {
    //     return await this.model.findOneAndUpdate({ document, 'pets._id': id }, {
    //         $pop: {
    //             'pets.$': id,
    //         },
    //     });
    // }

    // async find(document): Promise<Customer> {
    //     return await this.model.find({ document }).exec();
    // }

    // async findAll(): Promise<Customer[]> {
    //     return await this.model.find({}, 'firstName lastName name email document').exec();
    // }

    // async query(model: Query): Promise<Customer[]> {
    //     return await this.model.find(model.query, model.fields, { skip: model.skip, limit: model.take }).exec();
    // }
}
