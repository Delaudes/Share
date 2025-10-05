import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateRoomUseCase } from '../room/domain/create-room.use-case';
import { GetRoomListUseCase } from '../room/domain/get-room-list.use-case';
import { RoomList } from '../room/domain/room-list';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';

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
