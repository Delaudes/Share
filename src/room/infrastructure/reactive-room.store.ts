import { signal } from "@angular/core";
import { Expense } from "../../expense/domain/expense";
import { Payer } from "../../payer/domain/payer";
import { Room } from "../domain/room";
import { RoomStore } from "../domain/room.store";

export class ReactiveRoomStore implements RoomStore {

    readonly room = signal<Room | undefined>(undefined)

    getRoom(): Room | undefined {
        return this.room()
    }

    setRoom(room?: Room): void {
        this.room.set(room)
    }

    addPayer(payer: Payer): void {
        const newRoom = this.room()?.addPayer(payer)
        this.setRoom(newRoom)
    }

    addExpense(expense: Expense, payerId: string): void {
        const newRoom = this.room()?.addExpense(expense, payerId)
        this.setRoom(newRoom)
    }

    deleteExpense(expenseId: string): void {
        const newRoom = this.room()?.deleteExpense(expenseId)
        this.setRoom(newRoom)
    }
}