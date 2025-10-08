import { InjectionToken } from "@angular/core";
import { Expense } from "./expense";
import { ExpenseDraft } from "./expense-draft";


export interface ExpenseService {
    add(expenseDraft: ExpenseDraft, roomId: string): Promise<Expense>;
}

export const EXPENSE_SERVICE_TOKEN = new InjectionToken<ExpenseService>('ExpenseService')