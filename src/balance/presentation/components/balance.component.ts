import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AmountPipe } from '../../../amount/presentation/pipes/amount.pipe';
import { ROOM_STORE_TOKEN } from '../../../room/domain/ports/room.store';

@Component({
    selector: 'app-balance',
    imports: [AmountPipe],
    templateUrl: './balance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent {
    protected readonly roomStore = inject(ROOM_STORE_TOKEN);
}
