import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { FakeExpenseService } from "../../../expense/domain/fakes/fake-expense.service";
import { Expense } from "../../../expense/domain/models/expense";
import { AddExpenseUseCase } from "../../../expense/domain/use-cases/add-expense.use-case";
import { DeleteExpenseUseCase } from "../../../expense/domain/use-cases/delete-expense.use-case";
import { FakePayerService } from "../../../payer/domain/fakes/fake-payer.service";
import { Payer } from "../../../payer/domain/models/payer";
import { AddPayerUseCase } from "../../../payer/domain/use-cases/add-payer.use-case";
import { PayerComponent } from "../../../payer/presentation/components/payer.component";
import { FakeRouterService } from "../../../router/infrastructure/adapters/fake-router.service";
import { ROUTER_SERVICE_TOKEN } from "../../../router/infrastructure/ports/router.service";
import { FakeRoomService } from "../../domain/fakes/fake-room.service";
import { Room } from "../../domain/models/room";
import { ROOM_STORE_TOKEN } from "../../domain/ports/room.store";
import { LoadRoomUseCase } from "../../domain/use-cases/load-room.use-case";
import { ReactiveRoomStore } from "../../infrastructure/adapters/stores/reactive-room.store";
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

  beforeEach(async () => {
    fakeRouterService = new FakeRouterService()
    fakeRoomService = new FakeRoomService()
    fakePayerService = new FakePayerService()
    reactiveRoomStore = new ReactiveRoomStore()
    loadRoomUseCase = new LoadRoomUseCase(fakeRoomService, reactiveRoomStore)
    addPayerUseCase = new AddPayerUseCase(fakePayerService, reactiveRoomStore)

    spectator = createComponent()
    await Promise.resolve();
    await Promise.resolve();
    spectator.detectChanges()
  });

  it('should display room', () => {
    expect(spectator.query('[data-testid="room"]')).toHaveText(reactiveRoomStore.room()!.name)
  })

  it('should load room', async () => {
    expect(fakeRouterService.paramName).toEqual('id')
    expect(fakeRoomService.roomId).toEqual(fakeRouterService.paramValue)
  });

  it('should add payer', async () => {
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

    expect(spectator.query('[data-testid="balance"]')).toHaveText(reactiveRoomStore.room()!.calculateTotalExpenses().toFixed(2))
    expect(spectator.query('[data-testid="balance"]')).toHaveText(reactiveRoomStore.room()!.calculateAverageExpensesPerPayer().toFixed(2))
    expect(spectator.query('[data-testid="balance"]')).toHaveText(['Tim', '5.00', 'John'])
    expect(spectator.query('[data-testid="balance"]')).toHaveText(['Alice', '5.00', 'John'])
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


