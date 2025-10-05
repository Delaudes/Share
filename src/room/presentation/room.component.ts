import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPayerUseCase } from '../../payer/domain/add-payer.use-case';
import { PayerComponent } from '../../payer/presentation/payer.component';
import { ROUTER_SERVICE_TOKEN } from '../../router/router.service';
import { LoadRoomUseCase } from '../domain/load-room.use-case';
import { ROOM_STORE_TOKEN } from '../domain/room.store';

@Component({
  selector: 'app-room',
  imports: [FormsModule, PayerComponent],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  protected payerName = ''

  private readonly routerService = inject(ROUTER_SERVICE_TOKEN)
  protected readonly roomStore = inject(ROOM_STORE_TOKEN)
  private readonly loadRoomUseCase = inject(LoadRoomUseCase)
  private readonly addPayerUseCase = inject(AddPayerUseCase)

  async ngOnInit() {
    const roomId = this.routerService.getParamValue('id')
    if (roomId) {
      await this.loadRoomUseCase.execute(roomId)
    }
  }

  protected async addPayer() {
    await this.addPayerUseCase.execute(this.payerName)
    this.payerName = ''
  }
}
