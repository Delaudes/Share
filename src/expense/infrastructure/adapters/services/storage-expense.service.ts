import { LocalStorageService } from "../../../../local-storage/infrastructure/ports/local-storage.service";
import { Room } from "../../../../room/domain/models/room";
import { mapToRooms } from "../../../../room/infrastructure/mappers/storage-room.mapper";
import { UuidService } from "../../../../uuid/infrastructure/ports/uuid.service";
import { Expense } from "../../../domain/models/expense";
import { ExpenseDraft } from "../../../domain/models/expense-draft";
import { ExpenseService } from "../../../domain/ports/expense.service";

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

    async delete(expenseId: string): Promise<void> {
        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);
        rooms.forEach((room: Room) => room.deleteExpense(expenseId))
        this.localStorageService.setItem('share', JSON.stringify(rooms))
    }
}