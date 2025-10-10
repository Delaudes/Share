import { LocalStorageService } from "../../local-storage/local-storage.service";
import { Room } from "../../room/domain/room";
import { mapToRooms } from "../../room/infrastructure/storage-room.mapper";
import { UuidService } from "../../uuid/uuid.service";
import { Expense } from "../domain/expense";
import { ExpenseDraft } from "../domain/expense-draft";
import { ExpenseService } from "../domain/expense.service";

export class StorageExpenseService implements ExpenseService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async add(expenseDraft: ExpenseDraft, roomId: string): Promise<Expense> {
        const expense = new Expense(this.uuidService.generate(), expenseDraft.name, expenseDraft.amount)

        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        rooms.find((room: Room) => room.is(roomId))?.addExpense(expense, expenseDraft.payerId)
        this.localStorageService.setItem('share', JSON.stringify(rooms))

        return expense
    }
}