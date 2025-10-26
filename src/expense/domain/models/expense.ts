export class Expense {
    constructor(readonly id: string, readonly name: string, readonly amount: number) { }

    is(expenseId: string): boolean {
        return this.id === expenseId
    }
}