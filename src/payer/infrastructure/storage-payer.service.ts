import { LocalStorageService } from "../../local-storage/local-storage.service";
import { mapToRooms } from "../../room/infrastructure/storage-room.mapper";
import { UuidService } from "../../uuid/uuid.service";
import { Payer } from "../domain/payer";
import { PayerService } from "../domain/payer.service";

export class StoragePayerService implements PayerService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async add(payerName: string, roomId: string): Promise<Payer> {
        const payer = new Payer(this.uuidService.generate(), payerName, [])

        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        rooms.find((room) => room.is(roomId))?.addPayer(payer)
        this.localStorageService.setItem('share', JSON.stringify(rooms))

        return payer
    }
}