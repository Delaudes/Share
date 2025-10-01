import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ROUTER_SERVICE_TOKEN } from '../../router/router.service';
import { LoadRoomUseCase } from '../domain/load-room.use-case';
import { ROOM_STORE_TOKEN } from '../domain/room.store';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  private readonly routerService = inject(ROUTER_SERVICE_TOKEN)
  protected readonly roomStore = inject(ROOM_STORE_TOKEN)
  private readonly loadRoomUseCase = inject(LoadRoomUseCase)

  async ngOnInit() {
    const roomId = this.routerService.getParamValue('id')
    if (roomId) {
      await this.loadRoomUseCase.execute(roomId)
    }
  }

}
