import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomList } from '../../../room/domain/models/room-list';
import { CreateRoomUseCase } from '../../../room/domain/use-cases/create-room.use-case';
import { GetRoomListUseCase } from '../../../room/domain/use-cases/get-room-list.use-case';
import { ROUTER_SERVICE_TOKEN } from '../../../router/infrastructure/ports/router.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  protected roomName = ''
  protected roomList = new RoomList([])

  protected readonly routerService = inject(ROUTER_SERVICE_TOKEN)
  private readonly createRoomUseCase = inject(CreateRoomUseCase)
  private readonly getRoomListUseCase = inject(GetRoomListUseCase)

  async ngOnInit() {
    const roomList = await this.getRoomListUseCase.execute()
    this.roomList = roomList
  }

  protected async createRoom() {
    const room = await this.createRoomUseCase.execute(this.roomName)
    this.routerService.navigate(`/rooms/${room.id}`)
  }
}
