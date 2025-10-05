import { LocalStorageService } from "../../local-storage/local-storage.service";
import { Room } from "../../room/domain/room";
import { Payer } from "../domain/payer";
import { PayerService } from "../domain/payer.service";

export class StoragePayerService implements PayerService {
    constructor(private readonly localStorageService: LocalStorageService) { }

    async add(payerName: string, roomId: string): Promise<Payer> {
        const payer = new Payer(payerName)

        const stringRooms = this.localStorageService.getItem('share')
        const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : []
        const rooms = parsedRooms.map(parsedRoom => new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers))

        rooms.find((room) => room.id === roomId)?.payers.push(payer)
        this.localStorageService.setItem('share', JSON.stringify(rooms))

        return payer
    }
}