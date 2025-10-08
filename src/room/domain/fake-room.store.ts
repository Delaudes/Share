import { Expense } from "../../expense/expense";
import { Payer } from "../../payer/domain/payer";
import { Room } from "./room";
import { RoomStore } from "./room.store";

export class FakeRoomStore implements RoomStore {

    room?: Room

    getRoom(): Room | undefined {
        return this.room
    }

    setRoom(room: Room): void {
        this.room = room
    }

    addPayer(payer: Payer): void {
        this.room?.addPayer(payer)
    }

    addExpense(expense: Expense, payerId: string): void {
        this.room?.addExpense(expense, payerId)
    }
}