import { LocalStorageService } from "../../local-storage/local-storage.service";
import { Room } from "../../room/domain/room";
import { UuidService } from "../../uuid/uuid.service";
import { Payer } from "../domain/payer";
import { PayerService } from "../domain/payer.service";

export class StoragePayerService implements PayerService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async add(payerName: string, roomId: string): Promise<Payer> {
        const payer = new Payer(this.uuidService.generate(), payerName, [])

        const stringRooms = this.localStorageService.getItem('share')
        const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []
        const rooms = parsedRooms.map(parsedRoom => new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers))

        rooms.find((room) => room.is(roomId))?.payers.push(payer)
        this.localStorageService.setItem('share', JSON.stringify(rooms))

        return payer
    }
}