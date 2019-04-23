import { AggregateRoot } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../events/room-booked.event";

export class Room extends AggregateRoot {
    constructor(private readonly id: string) {
      super();
    }
  
    book(customer: string) {
      // logica
      this.apply(new RoomBookedEvent(this.id, customer));
    }
  }