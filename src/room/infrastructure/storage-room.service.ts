import { Builder } from "builder-pattern";
import { LocalStorageService } from "../../local-storage/local-storage.service";
import { UuidService } from "../../uuid/uuid.service";
import { Room } from "../domain/room";
import { RoomList } from "../domain/room-list";
import { RoomService } from "../domain/room.service";

export class StorageRoomService implements RoomService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async create(name: string): Promise<Room> {
        const room = Builder<Room>().id(this.uuidService.generate()).name(name).build()

        const stringRooms = this.localStorageService.getItem('rooms')
        const rooms = stringRooms ? JSON.parse(stringRooms) : []

        this.localStorageService.setItem('rooms', JSON.stringify([...rooms, room]))

        return room
    }

    async fetch(id: string): Promise<Room | undefined> {
        const stringRooms = this.localStorageService.getItem('rooms')
        const rooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []


        return rooms.find((room) => room.id === id)
    }

    async fetchAll(): Promise<RoomList> {
        const stringRooms = this.localStorageService.getItem('rooms')
        const rooms = stringRooms ? JSON.parse(stringRooms) : []

        return new RoomList(rooms)
    }
}