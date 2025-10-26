import { InjectionToken } from "@angular/core";
import { Expense } from "../models/expense";
import { ExpenseDraft } from "../models/expense-draft";


export interface ExpenseService {
    add(expenseDraft: ExpenseDraft, roomId: string): Promise<Expense>;
    delete(expenseId: string): Promise<void>;
}

export const EXPENSE_SERVICE_TOKEN = new InjectionToken<ExpenseService>('ExpenseService')