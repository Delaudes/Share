import { Expense } from "../../expense/domain/expense"

export class Payer {
    constructor(readonly id: string, readonly name: string, readonly expenses: Expense[]) { }

    is(payerId: string): boolean {
        return this.id === payerId
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense)
    }

    deleteExpense(expenseId: string) {
        const index = this.expenses.findIndex((expense) => expense.is(expenseId))
        if (index === -1) return
        this.expenses.splice(index, 1)
    }
}