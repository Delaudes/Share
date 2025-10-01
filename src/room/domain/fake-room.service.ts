import { Builder } from "builder-pattern";
import { Room } from "./room";
import { RoomList } from "./room-list";
import { RoomService } from "./room.service";

export class FakeRoomService implements RoomService {
    room = Builder<Room>().id('room-001').name('Holidays').build()
    roomList = Builder<RoomList>().rooms([
        Builder<Room>().id('room-001').name('Holidays').build(),
        Builder<Room>().id('room-002').name('Roommate').build()
    ]).build()
    roomId?: string
    roomName?: string

    async create(name: string): Promise<Room> {
        this.roomName = name

        return this.room
    }

    async fetch(id: string): Promise<Room> {
        this.roomId = id

        return this.room
    }

    async fetchAll(): Promise<RoomList> {

        return this.roomList
    }
}