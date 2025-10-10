import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddExpenseUseCase } from '../../expense/domain/add-expense.use-case';
import { ExpenseDraft } from '../../expense/domain/expense-draft';
import { Payer } from '../domain/payer';

@Component({
  selector: 'app-payer',
  imports: [FormsModule],
  templateUrl: './payer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayerComponent {
  readonly payer = input.required<Payer>()

  protected expenseName = ''
  protected expenseAmount = 0

  private readonly addExpenseUseCase = inject(AddExpenseUseCase)

  protected async addExpense() {
    const expenseDraft = new ExpenseDraft(this.expenseName, this.expenseAmount, this.payer().id)
    await this.addExpenseUseCase.execute(expenseDraft)
  }
}
