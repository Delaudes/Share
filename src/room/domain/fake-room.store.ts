import { Room } from "./room";
import { RoomStore } from "./room.store";

export class FakeRoomStore implements RoomStore {
    room?: Room

    getRoom(): Room | undefined {
        return this.room
    }

    setRoom(room: Room): void {
        this.room = room
    }

}