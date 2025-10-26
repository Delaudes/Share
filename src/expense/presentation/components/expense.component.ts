import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AmountPipe } from '../../../amount/presentation/pipes/amount.pipe';
import { Expense } from '../../domain/models/expense';
import { DeleteExpenseUseCase } from '../../domain/use-cases/delete-expense.use-case';

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
