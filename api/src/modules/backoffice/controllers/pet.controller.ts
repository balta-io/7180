import { Controller, Post, Body, Param, UseInterceptors, HttpStatus, HttpException, Put } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { PetService } from 'src/modules/backoffice/services/pet.service';

@Controller('v1/pets')
export class PetController {
    constructor(private readonly service: PetService) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async create(@Param('document') document, @Body() model: Pet) {
        try {
            await this.service.create(document, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async update(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.service.update(document, id, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    // Remover um Pet

    // Listas os pets

    // Consultar um pet    
}
