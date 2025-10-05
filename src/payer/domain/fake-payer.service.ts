import { Payer } from "./payer";
import { PayerService } from "./payer.service";

export class FakePayerService implements PayerService {
    roomId?: string
    payerName?: string

    payer = new Payer('John')

    async add(payerName: string, roomId: string): Promise<Payer> {
        this.roomId = roomId
        this.payerName = payerName

        return this.payer
    }
}