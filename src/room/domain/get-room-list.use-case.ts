import { RoomList } from "./room-list";
import { RoomService } from "./room.service";

export class GetRoomListUseCase {
    constructor(private readonly roomService: RoomService) { }

    async execute(): Promise<RoomList> {
        const roomList = await this.roomService.fetchAll()
        return roomList
    }
}