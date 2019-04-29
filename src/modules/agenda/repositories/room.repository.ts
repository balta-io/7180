import { Injectable } from '@nestjs/common';
import { Room } from '../models/room.model';

@Injectable()
export class RoomRepository {
  async findOneById(id: string): Promise<Room> {
    console.log('******************* Repository: findOne *******************');
    return new Room("12345678911");
  }

  async save(room: Room) {
    console.log('******************* Repository: Save *******************');
    return null;
  }
}