import { Module } from '@nestjs/common';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';

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
    controllers: [CustomerController],
    providers: [CustomerService, AccountService],
})
export class BackofficeModule {

}
