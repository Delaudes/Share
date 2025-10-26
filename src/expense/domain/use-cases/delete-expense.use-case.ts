import { RoomStore } from "../../../room/domain/ports/room.store"
import { ExpenseService } from "../ports/expense.service"


export class DeleteExpenseUseCase {
    constructor(private readonly expenseService: ExpenseService, private readonly roomStore: RoomStore) { }

    async execute(expenseId: string): Promise<void> {
        await this.expenseService.delete(expenseId)

        this.roomStore.deleteExpense(expenseId)
    }
}