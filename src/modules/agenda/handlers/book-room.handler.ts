import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(
    // private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BookRoomCommand) {
    // const { customer, room } = command;
    // const room = this.publisher.mergeObjectContext(
    //   await this.repository.findOneById(+heroId),
    // );
    
    // room.book(customer);
    // room.commit();
  }
}