import { RoomService } from "./room.service";
import { RoomStore } from "./room.store";

export class LoadRoomUseCase {
    constructor(private readonly roomService: RoomService, private readonly roomStore: RoomStore) { }

    async execute(roomId: string): Promise<void> {
        const room = await this.roomService.fetch(roomId)
        this.roomStore.setRoom(room)
    }
}