import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/room-booked.event';

export class Room extends AggregateRoot {
    constructor(private readonly id: string) {
        super();
    }

    book(customerId: string) {
        // Regras de negócio
        this.apply(new RoomBookedEvent(customerId, this.id));
    }
}