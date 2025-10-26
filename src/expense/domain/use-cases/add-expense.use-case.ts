import { RoomStore } from "../../../room/domain/ports/room.store";
import { ExpenseDraft } from "../models/expense-draft";
import { ExpenseService } from "../ports/expense.service";


export class AddExpenseUseCase {
    constructor(private readonly expenseService: ExpenseService, private readonly roomStore: RoomStore) { }

    async execute(expenseDraft: ExpenseDraft): Promise<void> {

        const roomId = this.roomStore.getRoom()!.id
        const expense = await this.expenseService.add(expenseDraft, roomId)

        this.roomStore.addExpense(expense, expenseDraft.payerId)
    }
}