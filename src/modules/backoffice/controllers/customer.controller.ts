import { Controller, Post, Get, Body, Param, UseInterceptors, HttpStatus, HttpException, Put } from '@nestjs/common';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Query } from 'src/modules/backoffice/models/query.model';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { Result } from 'src/modules/backoffice/models/result.model';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { Address } from '../models/address.model';
import { Pet } from '../models/pet.model';
import { Guid } from "guid-typescript";
import { CreatePetContract } from '../contracts/customer/create-pet.contract';

@Controller('v1/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService, private readonly accountService: AccountService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, false));
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            await this.customerService.create(customer);
            return model;
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/address/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addBillingAddress(document, model);
            return model;
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/address/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addShippingAddress(document, model);
            return model;
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async addPet(@Param('document') document, @Body() model: Pet) {
        try {
            const res = await this.customerService.createPet(document, model);
            return res;
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            const res = await this.customerService.updatePet(document, id, model);
            return res;
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        return this.customerService.findAll();
    }

    @Get(':document')
    async get(@Param('document') document) {
        return this.customerService.find(document);
    }

    @Post('query')
    async query(@Body() model: Query) {
        return this.customerService.query(model);
    }

    // @Put()
    // async put() { }

    // @Delete()
    // async delete() { }
}
