import { Expense } from "../../expense/expense"

export class Payer {
    constructor(readonly id: string, readonly name: string, readonly expenses: Expense[]) { }

    is(payerId: string): boolean {
        return this.id === payerId
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense)
    }
}