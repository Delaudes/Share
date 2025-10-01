import { signal } from "@angular/core";
import { Room } from "../domain/room";
import { RoomStore } from "../domain/room.store";

export class ReactiveRoomStore implements RoomStore {
    readonly room = signal<Room | undefined>(undefined)

    getRoom(): Room | undefined {
        return this.room()
    }

    setRoom(room?: Room): void {
        this.room.set(room)
    }


}