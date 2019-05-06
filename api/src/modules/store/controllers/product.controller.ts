import { Controller, HttpException, HttpStatus, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';
import { Product } from '../entities/product.entity';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new ResultDto(null, true, products, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível listar os produtos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível incluir o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível alterar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.delete(id);
            return new ResultDto("Produto removido com sucesso!", true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível remover o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
