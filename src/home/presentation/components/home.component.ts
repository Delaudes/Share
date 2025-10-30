import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomList } from '../../../room/domain/models/room-list';
import { CreateRoomUseCase } from '../../../room/domain/use-cases/create-room.use-case';
import { DeleteRoomUseCase } from '../../../room/domain/use-cases/delete-room.use-case';
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
  protected roomList = signal(new RoomList([]))

  protected readonly routerService = inject(ROUTER_SERVICE_TOKEN)
  private readonly createRoomUseCase = inject(CreateRoomUseCase)
  private readonly getRoomListUseCase = inject(GetRoomListUseCase)
  private readonly deleteRoomUseCase = inject(DeleteRoomUseCase)

  async ngOnInit() {
    const roomList = await this.getRoomListUseCase.execute()
    this.roomList.set(roomList)
  }

  protected async createRoom() {
    const room = await this.createRoomUseCase.execute(this.roomName)
    this.routerService.navigate(`/rooms/${room.id}`)
  }

  protected async deleteRoom(roomId: string) {
    await this.deleteRoomUseCase.execute(roomId)
    const updatedRoomList = this.roomList().removeRoom(roomId)
    this.roomList.set(updatedRoomList)
  }
}
