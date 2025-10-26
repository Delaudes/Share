import { Expense } from "../models/expense";
import { ExpenseDraft } from "../models/expense-draft";
import { ExpenseService } from "../ports/expense.service";

export class FakeExpenseService implements ExpenseService {
    expense = new Expense('expense-001', 'Pizzas', 26,)
    roomId?: string
    expenseDraft?: ExpenseDraft

    expenseId?: string

    async add(expenseDraft: ExpenseDraft, roomId: string): Promise<Expense> {
        this.expenseDraft = expenseDraft
        this.roomId = roomId

        return this.expense
    }

    async delete(expenseId: string): Promise<void> {
        this.expenseId = expenseId
    }
}