export class BookRoomCommand {
    constructor(
      public readonly customerId: string,
      public readonly roomId: string,
    ) {}
  }