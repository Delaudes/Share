import { Room } from "./room";

export class RoomList {
    constructor(readonly rooms: Room[]) { }

    removeRoom(roomId: string): RoomList {
        const filteredRooms = this.rooms.filter(room => !room.is(roomId))
        return new RoomList(filteredRooms)
    }
}