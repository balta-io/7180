export class BookRoomCommand {
    constructor(
      public readonly customer: string,
      public readonly room: string,
    ) {
      console.log('******************* BookRoomCommand *******************');
    }
  }