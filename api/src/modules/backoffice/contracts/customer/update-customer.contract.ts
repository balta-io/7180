import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];

    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
