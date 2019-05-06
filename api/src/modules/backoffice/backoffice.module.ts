import { Module, CacheModule, HttpModule } from '@nestjs/common';
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
import { AuthService } from 'src/shared/services/auth.service';
import { AccountController } from './controllers/account.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
    imports: [
        CacheModule.register(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ]),
        HttpModule
    ],
    controllers: [AddressController, CustomerController, PetController, AccountController],
    providers: [AccountService, AddressService, CustomerService, PetService, AuthService, JwtStrategy],
})
export class BackofficeModule {

}
