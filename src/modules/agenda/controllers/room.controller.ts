import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AgendaService } from '../services/agenda.service';
import { BookRoomCommand } from '../commands/book-room.command';

@Controller('v1/rooms')
export class RoomController {
    constructor(private readonly service: AgendaService) { }

    @Post(':id/book')
    async book(@Param('id') id: string, @Body() dto: BookRoomCommand) {
        console.log('******************* Controller *******************');
        console.log(dto);
        await this.service.Book(dto.customer, id);
    }

    //   @Get()
    //   async findAll(): Promise<Hero[]> {
    //     return this.heroesService.findAll();
    //   }
}