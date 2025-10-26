import { provideZonelessChangeDetection } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FakeRoomService } from '../../../room/domain/fakes/fake-room.service';
import { CreateRoomUseCase } from '../../../room/domain/use-cases/create-room.use-case';
import { GetRoomListUseCase } from '../../../room/domain/use-cases/get-room-list.use-case';
import { FakeRouterService } from '../../../router/infrastructure/adapters/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../../../router/infrastructure/ports/router.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;

  let fakeRouterService: FakeRouterService
  let fakeRoomService: FakeRoomService
  let createRoomUseCase: CreateRoomUseCase
  let getRoomListUseCase: GetRoomListUseCase

  const createComponent = createComponentFactory({
    component: HomeComponent,
    providers: [provideZonelessChangeDetection(),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useFactory: () => fakeRouterService
    },
    {
      provide: CreateRoomUseCase,
      useFactory: () => createRoomUseCase
    },
    {
      provide: GetRoomListUseCase,
      useFactory: () => getRoomListUseCase
    },
    ],
  })

  beforeEach(async () => {
    fakeRouterService = new FakeRouterService()
    fakeRoomService = new FakeRoomService()
    createRoomUseCase = new CreateRoomUseCase(fakeRoomService)
    getRoomListUseCase = new GetRoomListUseCase(fakeRoomService)

    spectator = createComponent()
    await new Promise(resolve => setTimeout(resolve, 0));
    spectator.detectChanges()
  });

  it('should display home', () => {
    expect(spectator.queryAll('[data-testid="existing-room"]').length).toEqual(2)
    spectator.queryAll('[data-testid="existing-room"]').forEach((existingRoom, index) => {
      expect(existingRoom).toHaveText(fakeRoomService.roomList.rooms[index].name)
      expect(existingRoom).toHaveText(fakeRoomService.roomList.rooms[index].id)
    })
  });

  it('should navigate to room', async () => {
    await clickAndWait('[data-testid="existing-room"]');

    expect(fakeRouterService.path).toEqual(`/rooms/${fakeRoomService.roomList.rooms[0].id}`)
  })

  it('should create room', async () => {
    const roomName = 'Holidays'
    spectator.typeInElement(roomName, '[data-testid="room-name"]')

    await clickAndWait('[data-testid="create-room"]');

    expect(fakeRoomService.roomName).toEqual(roomName)
  })

  it('should navigate to created room', async () => {
    await clickAndWait('[data-testid="create-room"]');

    expect(fakeRouterService.path).toEqual(`/rooms/${fakeRoomService.room.id}`)
  });

  async function clickAndWait(selector: string) {
    spectator.click(selector);
    await new Promise(resolve => setTimeout(resolve, 0));
  }
});
