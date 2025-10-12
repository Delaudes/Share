import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { AddExpenseUseCase } from "../../expense/domain/add-expense.use-case";
import { DeleteExpenseUseCase } from "../../expense/domain/delete-expense.use-case";
import { Expense } from "../../expense/domain/expense";
import { FakeExpenseService } from "../../expense/domain/fake-expense.service";
import { AddPayerUseCase } from "../../payer/domain/add-payer.use-case";
import { FakePayerService } from "../../payer/domain/fake-payer.service";
import { Payer } from "../../payer/domain/payer";
import { PayerComponent } from "../../payer/presentation/payer.component";
import { FakeRouterService } from "../../router/fake-router.service";
import { ROUTER_SERVICE_TOKEN } from "../../router/router.service";
import { FakeRoomService } from "../domain/fake-room.service";
import { LoadRoomUseCase } from "../domain/load-room.use-case";
import { Room } from "../domain/room";
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
    ...provideChildrensDependencies()
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

  it('should add payer with name', async () => {
    const payerName = 'John'

    spectator.typeInElement(payerName, '[data-testid="payer-name"]')
    await clickAndWait('[data-testid="add-payer"]');

    expect(fakePayerService.payerName).toEqual(payerName)
  })

  it('should display payers', async () => {
    expect(spectator.queryAll(PayerComponent).length).toEqual(0)

    await clickAndWait('[data-testid="add-payer"]');

    expect(spectator.queryAll(PayerComponent).length).toEqual(1)

    await clickAndWait('[data-testid="add-payer"]');

    expect(spectator.queryAll(PayerComponent).length).toEqual(2)
  })

  it('should display balance', () => {
    reactiveRoomStore.setRoom(
      new Room('room-001', 'Roomate', [
        new Payer('payer-001', 'John', [
          new Expense('expense-001', 'Pizzas', 19),
          new Expense('expense-002', 'Drinks', 6)
        ]),
        new Payer('payer-002', 'Tim', [
          new Expense('expense-003', 'Groceries', 3),
          new Expense('expense-004', 'Snacks', 7)
        ]),
        new Payer('payer-003', 'Alice', [
          new Expense('expense-005', 'Party', 8),
          new Expense('expense-006', 'Transport', 2)
        ])]
      ))

    spectator.detectChanges()

    expect(spectator.query('[data-testid="balance"]')).toContainText(['Tim', '5.00', 'John'])
    expect(spectator.query('[data-testid="balance"]')).toContainText(['Alice', '5.00', 'John'])
  })

  async function clickAndWait(selector: string) {
    spectator.click(selector);
    await Promise.resolve();
    await Promise.resolve();
    spectator.detectChanges()
  }

  function provideChildrensDependencies() {
    return [
      {
        provide: AddExpenseUseCase,
        useFactory: () => new AddExpenseUseCase(new FakeExpenseService(), reactiveRoomStore)
      },
      {
        provide: DeleteExpenseUseCase,
        useFactory: () => new DeleteExpenseUseCase(new FakeExpenseService(), reactiveRoomStore)
      }]
  }
});


