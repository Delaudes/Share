import { RoomStore } from "../../room/domain/room.store";
import { PayerService } from "./payer.service";

export class AddPayerUseCase {
    constructor(private readonly payerService: PayerService, private readonly roomStore: RoomStore) { }

    async execute(payerName: string): Promise<void> {
        const roomId = this.roomStore.getRoom()!.id
        const payer = await this.payerService.add(payerName, roomId)

        this.roomStore.addPayer(payer)
    }
}