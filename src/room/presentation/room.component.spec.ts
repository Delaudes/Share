import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { AddPayerUseCase } from "../../payer/domain/add-payer.use-case";
import { FakePayerService } from "../../payer/domain/fake-payer.service";
import { PayerComponent } from "../../payer/presentation/payer.component";
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
  let fakePayerService: FakePayerService
  let reactiveRoomStore: ReactiveRoomStore
  let loadRoomUseCase: LoadRoomUseCase
  let addPayerUseCase: AddPayerUseCase

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
      provide: AddPayerUseCase,
      useFactory: () => addPayerUseCase
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
    fakePayerService = new FakePayerService()
    reactiveRoomStore = new ReactiveRoomStore()
    loadRoomUseCase = new LoadRoomUseCase(fakeRoomService, reactiveRoomStore)
    addPayerUseCase = new AddPayerUseCase(fakePayerService, reactiveRoomStore)

    spectator = createComponent()
  });

  it('should display loaded room name', async () => {
    spectator.detectChanges()

    expect(spectator.query('[data-testid="room-name"]')).toHaveText(reactiveRoomStore.room()!.name)
    expect(fakeRouterService.paramName).toEqual('id')
    expect(fakeRoomService.roomId).toEqual(fakeRouterService.paramValue)
  });

  it('should display payers', async () => {
    expect(spectator.queryAll(PayerComponent).length).toEqual(0)

    const payerName = 'John'
    spectator.typeInElement(payerName, '[data-testid="payer-name"]')

    await clickAndWait('[data-testid="add-payer"]');
    spectator.detectChanges()

    expect(spectator.queryAll(PayerComponent).length).toEqual(1)
    spectator.queryAll(PayerComponent).forEach((payerComponent) => {
      expect(payerComponent.payer().name).toEqual(payerName)
    })
  })

  async function clickAndWait(selector: string) {
    spectator.click(selector);
    await Promise.resolve();
    await Promise.resolve();
  }
});
