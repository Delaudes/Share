import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { FakeRouterService } from "../../router/fake-router.service";
import { ROUTER_SERVICE_TOKEN } from "../../router/router.service";
import { FakeRoomService } from "../domain/fake-room.service";
import { LoadRoomUseCase } from "../domain/load-room.use-case";
import { ROOM_STORE_TOKEN } from "../domain/room.store";
import { ReactiveRoomStore } from "../infrastructure/reactive-room.store";
import { RoomComponent } from "./room.component";


describe('RoomComponent', () => {
  let spectator: Spectator<RoomComponent>;

  let fakeRouterService: FakeRouterService
  let fakeRoomService: FakeRoomService
  let reactiveRoomStore: ReactiveRoomStore
  let loadRoomUseCase: LoadRoomUseCase

  const createComponent = createComponentFactory({
    component: RoomComponent,
    providers: [provideZonelessChangeDetection(),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useFactory: () => fakeRouterService
    },
    {
      provide: LoadRoomUseCase,
      useFactory: () => loadRoomUseCase
    },
    {
      provide: ROOM_STORE_TOKEN,
      useFactory: () => reactiveRoomStore
    },
    ],
  })

  beforeEach(() => {
    fakeRouterService = new FakeRouterService()
    fakeRoomService = new FakeRoomService()
    reactiveRoomStore = new ReactiveRoomStore()
    loadRoomUseCase = new LoadRoomUseCase(fakeRoomService, reactiveRoomStore)

    spectator = createComponent()
  });

  it('should display loaded room name', async () => {
    spectator.detectChanges()

    expect(spectator.query('[data-testid="room-name"]')).toHaveExactText(reactiveRoomStore.room()!.name)
    expect(fakeRouterService.paramName).toEqual('id')
    expect(fakeRoomService.roomId).toEqual(fakeRouterService.paramValue)
  });
});
