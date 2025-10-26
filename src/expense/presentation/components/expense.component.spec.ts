import { provideZonelessChangeDetection } from "@angular/core";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { Payer } from "../../../payer/domain/models/payer";
import { Room } from "../../../room/domain/models/room";
import { ReactiveRoomStore } from "../../../room/infrastructure/adapters/stores/reactive-room.store";
import { FakeExpenseService } from "../../domain/fakes/fake-expense.service";
import { Expense } from "../../domain/models/expense";
import { DeleteExpenseUseCase } from "../../domain/use-cases/delete-expense.use-case";
import { ExpenseComponent } from "./expense.component";

describe('ExpenseComponent', () => {
    let spectator: Spectator<ExpenseComponent>;

    let fakeExpenseService: FakeExpenseService
    let reactiveRoomStore: ReactiveRoomStore
    let deleteExpenseUseCase: DeleteExpenseUseCase

    const createComponent = createComponentFactory({
        component: ExpenseComponent,
        providers: [provideZonelessChangeDetection(),
        {
            provide: DeleteExpenseUseCase,
            useFactory: () => deleteExpenseUseCase
        }
        ],
    })

    beforeEach(() => {
        fakeExpenseService = new FakeExpenseService()
        reactiveRoomStore = new ReactiveRoomStore()
        reactiveRoomStore.setRoom(new Room('room-002', 'Holidays', [new Payer('payer-001', 'John', [new Expense('expense-001', 'Pizzas', 26)])]))
        deleteExpenseUseCase = new DeleteExpenseUseCase(fakeExpenseService, reactiveRoomStore)

        spectator = createComponent({
            props: {
                expense: new Expense('expense-001', 'Pizzas', 26)
            }
        })
    });

    it('should display expense', () => {
        expect(spectator.query('[data-testid="expense"]')).toHaveText(spectator.component.expense().name)
        expect(spectator.query('[data-testid="expense"]')).toHaveText(spectator.component.expense().amount.toFixed(2))
    })

    it('should delete expense on button click', async () => {
        await clickAndWait('[data-testid="delete-expense"]');

        expect(reactiveRoomStore.getRoom()).toEqual(new Room('room-002', 'Holidays', [new Payer('payer-001', 'John', [])]))
    })

    async function clickAndWait(selector: string) {
        spectator.click(selector);
        await Promise.resolve();
        await Promise.resolve();
        spectator.detectChanges()
    }
})