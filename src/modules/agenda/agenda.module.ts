import { Module } from '@nestjs/common';
import { RoomController } from './controllers/room.controller';
import { AgendaService } from './services/agenda.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomRepository } from './repositories/room.repository';
import { BookRoomHandler } from './handlers/book-room.handler';
import { RoomBookedEvent } from './events/room-booked.event';
// import { CommandHandlers } from '../handlers';
// import { EventHandlers } from '../events';

@Module({
    // imports: [CqrsModule],
    // controllers: [RoomController],
    // providers: [
    //     AgendaService,
    //     RoomRepository,
    //     BookRoomHandler,
    //     RoomBookedEvent
    // ]
})
export class AgendaModule { }
