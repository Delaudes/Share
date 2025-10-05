import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Payer } from '../domain/payer';

@Component({
  selector: 'app-payer',
  imports: [],
  templateUrl: './payer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayerComponent {
  readonly payer = input.required<Payer>()
}
