import { Controller, Post, Body, Param, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/modules/backoffice/interceptors/validator.interceptor';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';
import { Address } from 'src/modules/backoffice/models/address.model';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { AddressType } from 'src/modules/backoffice/enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {
    constructor(private readonly service: AddressService) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createBilling(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Billing);
            return new ResultDto(null, true, model, null);            
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createShipping(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new ResultDto(null, true, model, null);            
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
