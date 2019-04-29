import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";
import { RoomRepository } from "../repositories/room.repository";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(
    private readonly repository: RoomRepository,
    private readonly publisher: EventPublisher,
  ) { }

  async execute(command: BookRoomCommand) {
    console.log('******************* Handler *******************');

    const room = await this.repository.findOneById(command.room);

    room.book(command.customer);
    await this.repository.save(room);
  }
}