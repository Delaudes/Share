import { Builder } from "builder-pattern";
import { Room } from "./room";
import { RoomService } from "./room.service";

export class FakeRoomService implements RoomService {
    room = Builder<Room>().id('room-001').build()

    async create(): Promise<Room> {

        return this.room
    }
}