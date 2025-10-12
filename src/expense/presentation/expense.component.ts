import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AmountPipe } from '../../room/pipes/amount.pipe';
import { DeleteExpenseUseCase } from '../domain/delete-expense.use-case';
import { Expense } from '../domain/expense';

@Component({
  selector: 'app-expense',
  imports: [AmountPipe],
  templateUrl: './expense.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseComponent {
  readonly expense = input.required<Expense>()

  private readonly deleteExpenseUseCase = inject(DeleteExpenseUseCase)

  protected async deleteExpense() {
    await this.deleteExpenseUseCase.execute(this.expense().id)
  }
}
