export class RoomBookedEvent {
    constructor(
      public readonly customer: string,
      public readonly room: string,
    ) {}
  }