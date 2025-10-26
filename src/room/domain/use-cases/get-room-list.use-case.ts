import { RoomList } from "../models/room-list";
import { RoomService } from "../ports/room.service";

export class GetRoomListUseCase {
    constructor(private readonly roomService: RoomService) { }

    async execute(): Promise<RoomList> {
        const roomList = await this.roomService.fetchAll()
        return roomList
    }
}