import { Controller, Get, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RoomBookService } from './services/room-book.service';
import { BookRoomDto } from './dtos/book-room.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { BookRoomCommand } from './commands/book-room.command';
import { ResultDto } from '../backoffice/dtos/result.dto';

@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto) {
        try {
            var command = new BookRoomCommand(request.user.document, model.roomId, model.date);
            await this.service.Book(command);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível reservar sua sala', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

}