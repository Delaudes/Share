import { Builder } from "builder-pattern";
import { LocalStorageService } from "../../local-storage/local-storage.service";
import { UuidService } from "../../uuid/uuid.service";
import { Room } from "../domain/room";
import { RoomService } from "../domain/room.service";

export class StorageRoomService implements RoomService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async create(): Promise<Room> {
        const room = Builder<Room>().id(this.uuidService.generate()).build()
        this.localStorageService.setItem(room.id, JSON.stringify(room))
        return room
    }
}