import { RoomService } from "../ports/room.service";

export class DeleteRoomUseCase {
    constructor(private readonly roomService: RoomService) { }

    async execute(roomId: string): Promise<void> {
        await this.roomService.delete(roomId)
    }
}
