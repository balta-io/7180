import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        if (!model.query)
            model.query = {};

        flunt.isGreaterThan(model.take, 1000, 'Sua query não pode retornar mais que 1000 registros');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
