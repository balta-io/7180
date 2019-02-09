import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';

import { AccountService } from 'src/modules/backoffice/services/account.service';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { PetService } from 'src/modules/backoffice/services/pet.service';

import { AddressController } from 'src/modules/backoffice/controllers/address.controller';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { PetController } from 'src/modules/backoffice/controllers/pet.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Customer',
            schema: CustomerSchema,
        },
        {
            name: 'User',
            schema: UserSchema,
        },
    ])],
    controllers: [AddressController, CustomerController, PetController],
    providers: [AccountService, AddressService, CustomerService, PetService],
})
export class BackofficeModule {

}
