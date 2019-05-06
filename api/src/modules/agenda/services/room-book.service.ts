import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/book-room.command';

@Injectable()
export class RoomBookService {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    async Book(command: BookRoomCommand) {
        return await this.commandBus.execute(
            command,
        );
    }
}