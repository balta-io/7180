import { BookRoomCommand } from "../book-room.command";
import { EventPublisher, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RoomRepository } from "../../repositories/room.repository";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(
    private readonly repository: RoomRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: BookRoomCommand) {
    console.log('BookRoomHandler:execute - Executando o comando...');

    const { customerId, roomId } = command;
    const room = this.publisher.mergeObjectContext(
      await this.repository.findOneById(roomId),
    );

    room.book(customerId);
    room.commit();
  }
}