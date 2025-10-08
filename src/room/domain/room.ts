import { Expense } from "../../expense/expense";
import { Payer } from "../../payer/domain/payer";

export class Room {
    constructor(readonly id: string, readonly name: string, readonly payers: Payer[]) { }

    is(roomId: string): boolean {
        return this.id === roomId
    }

    addPayer(payer: Payer): Room {
        this.payers.push(payer)
        return new Room(this.id, this.name, this.payers)
    }

    findPayer(payerId: string): Payer | undefined {
        return this.payers.find((payer) => payer.is(payerId))
    }

    addExpense(expense: Expense, payerId: string): Room {
        this.findPayer(payerId)?.addExpense(expense)
        return new Room(this.id, this.name, this.payers)
    }
}