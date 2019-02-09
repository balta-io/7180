import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Address } from 'src/modules/backoffice/models/address.model';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street, 3, 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválida');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');
        flunt.isFixedLen(model.country, 3, 'País inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
