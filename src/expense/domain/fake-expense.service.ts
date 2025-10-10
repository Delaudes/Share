import { Expense } from "./expense";
import { ExpenseDraft } from "./expense-draft";
import { ExpenseService } from "./expense.service";

export class FakeExpenseService implements ExpenseService {
    expense = new Expense('expense-001', 'Pizzas', 26,)
    roomId?: string
    expenseDraft?: ExpenseDraft

    async add(expenseDraft: ExpenseDraft, roomId: string): Promise<Expense> {
        this.expenseDraft = expenseDraft
        this.roomId = roomId

        return this.expense
    }

}