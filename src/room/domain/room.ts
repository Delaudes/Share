import { Payer } from "../../payer/domain/payer";

export class Room {
    constructor(readonly id: string, readonly name: string, readonly payers: Payer[]) { }

    is(roomId: string): boolean {
        return this.id === roomId
    }

    addPayer(payer: Payer): Room {
        return new Room(this.id, this.name, [...this.payers, payer])
    }
}