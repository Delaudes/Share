import { LocalStorageService } from "../../local-storage/local-storage.service";
import { UuidService } from "../../uuid/uuid.service";
import { Room } from "../domain/room";
import { RoomList } from "../domain/room-list";
import { RoomService } from "../domain/room.service";

export class StorageRoomService implements RoomService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async create(roomName: string): Promise<Room> {
        const room = new Room(this.uuidService.generate(), roomName, [])

        const stringRooms = this.localStorageService.getItem('share')
        const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []
        const rooms = parsedRooms.map(parsedRoom => new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers))

        this.localStorageService.setItem('share', JSON.stringify([...rooms, room]))

        return room
    }

    async fetch(roomId: string): Promise<Room | undefined> {
        const stringRooms = this.localStorageService.getItem('share')
        const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []
        const rooms = parsedRooms.map(parsedRoom => new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers))

        return rooms.find((room) => room.id === roomId)
    }

    async fetchAll(): Promise<RoomList> {
        const stringRooms = this.localStorageService.getItem('share')
        const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []
        const rooms = parsedRooms.map(parsedRoom => new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers))

        return new RoomList(rooms)
    }
}