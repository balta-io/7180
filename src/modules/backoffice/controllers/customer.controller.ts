import { Controller, Post, Get, Body, Param, UseInterceptors, HttpStatus, HttpException, Put, Req, UseGuards } from '@nestjs/common';
import { Md5 } from "md5-typescript";
import * as Azure from "@azure/storage-blob";
import { Guid } from "guid-typescript";
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { User } from 'src/modules/backoffice/models/user.model';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreditCard } from '../models/credit-card.model';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';

@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly accountService: AccountService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
            const user = await this.accountService.create(new User(model.document, password, ['user'], false));
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            await this.customerService.create(customer);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar seus dados', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new ResultDto(null, true, customers, null);
    }

    @Get(':document')
    async get(@Param('document') document) {
        const customer = await this.customerService.find(document);
        return new ResultDto(null, true, customer, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new ResultDto(null, true, customers, null);
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createBilling(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/upload')
    async uploadImage(@Body() body: any) {
        try {
            
            let filename = Guid.create().toString().substring(0, 8).replace('-', '') + '.jpg';
            let rawdata = body.image;
            let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let type = matches[1];
            let buffer = new Buffer(matches[2], 'base64');

            // Cria o Blob Service
            Azure.uploadStreamToBlockBlob()
            const blobSvc = await Azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=7180;AccountKey=8aE1CeGd11BQ1KJWoJWQgw/FXrSGSkQyEkxvnpB7oFCS7wNM4TbyEul3VRTrqGex1OHpoDdL9DPGso9WNORehQ==;EndpointSuffix=core.windows.net");


            // Salva a imagem
            await blobSvc.createBlockBlobFromText('customer-images', filename, buffer, function (error, result, response) {
                if (error) {
                    filename = 'default-image.png'
                }
            });

            return new ResultDto(null, true, { image: filename }, null);
        } catch (error) {
            console.log(error);
            throw new HttpException(new ResultDto('Não foi possível enviar sua imagem', false, null, error), HttpStatus.BAD_REQUEST);

        }
    }
}
