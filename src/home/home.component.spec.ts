import { provideZonelessChangeDetection } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CreateRoomUseCase } from '../room/domain/create-room.use-case';
import { FakeRoomService } from '../room/domain/fake-room.service';
import { GetRoomListUseCase } from '../room/domain/get-room-list.use-case';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
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

  beforeEach(() => {
    fakeRouterService = new FakeRouterService()
    fakeRoomService = new FakeRoomService()
    createRoomUseCase = new CreateRoomUseCase(fakeRoomService)
    getRoomListUseCase = new GetRoomListUseCase(fakeRoomService)

    spectator = createComponent()

  });

  it('should navigate to existing room', async () => {
    await Promise.resolve();
    spectator.detectChanges()

    expect(spectator.queryAll('[data-testid="existing-room"]').length).toEqual(2)
    spectator.queryAll('[data-testid="existing-room"]').forEach((existingRoom, index) => {
      expect(existingRoom).toHaveText(fakeRoomService.roomList.rooms[index].name)
      expect(existingRoom).toHaveText(fakeRoomService.roomList.rooms[index].id)
    })

    await clickAndWait('[data-testid="existing-room"]');

    expect(fakeRouterService.path).toEqual(`/rooms/${fakeRoomService.roomList.rooms[0].id}`)
  })

  it('should navigate to created room', async () => {
    await clickAndWait('[data-testid="create-room"]');

    expect(fakeRouterService.path).toEqual(`/rooms/${fakeRoomService.room.id}`)
  });

  it('should create room with empty name', async () => {
    await clickAndWait('[data-testid="create-room"]');

    expect(fakeRoomService.roomName).toEqual('')
  })

  it('should create room with name', async () => {
    const roomName = 'Holidays'
    spectator.typeInElement(roomName, '[data-testid="room-name"]')

    await clickAndWait('[data-testid="create-room"]');

    expect(fakeRoomService.roomName).toEqual(roomName)
  })

  async function clickAndWait(selector: string) {
    spectator.click(selector);
    await Promise.resolve();
    await Promise.resolve();
  }
});
