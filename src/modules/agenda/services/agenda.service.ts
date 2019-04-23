import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";

@Injectable()
export class AgendaService {
    constructor(private readonly commandBus: CommandBus) { }

    async Book(customer: string, room: string) {
        return this.commandBus.execute(
            new BookRoomCommand(customer, room)
        );
    }
}