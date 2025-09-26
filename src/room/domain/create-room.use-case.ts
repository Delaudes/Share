import { Room } from "./room";
import { RoomService } from "./room.service";

export class CreateRoomUseCase {
    constructor(private readonly roomService: RoomService) { }

    async execute(): Promise<Room> {
        return await this.roomService.create()
    }
}