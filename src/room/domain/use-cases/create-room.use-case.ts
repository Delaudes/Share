import { Room } from "../models/room";
import { RoomService } from "../ports/room.service";

export class CreateRoomUseCase {
    constructor(private readonly roomService: RoomService) { }

    async execute(roomName: string): Promise<Room> {
        const room = await this.roomService.create(roomName)
        return room
    }
}