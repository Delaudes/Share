import { Room } from "../models/room";
import { RoomList } from "../models/room-list";
import { RoomService } from "../ports/room.service";

export class FakeRoomService implements RoomService {
    room = new Room('room-001', 'Holidays', [])
    roomList = new RoomList([
        new Room('room-001', 'Holidays', []), new Room('room-002', 'Roomate', [])
    ])
    roomId?: string
    roomName?: string

    async create(roomName: string): Promise<Room> {
        this.roomName = roomName

        return this.room
    }

    async fetch(roomId: string): Promise<Room> {
        this.roomId = roomId

        return this.room
    }

    async fetchAll(): Promise<RoomList> {

        return this.roomList
    }
}