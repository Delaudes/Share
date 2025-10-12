import { provideZonelessChangeDetection } from "@angular/core";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { Payer } from "../../payer/domain/payer";
import { Room } from "../../room/domain/room";
import { ReactiveRoomStore } from "../../room/infrastructure/reactive-room.store";
import { DeleteExpenseUseCase } from "../domain/delete-expense.use-case";
import { Expense } from "../domain/expense";
import { FakeExpenseService } from "../domain/fake-expense.service";
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

    it('should display expense name and amount', () => {
        expect(spectator.query('[data-testid="expense-name"]')).toHaveText(spectator.component.expense().name)
        expect(spectator.query('[data-testid="expense-amount"]')).toHaveText(spectator.component.expense().amount.toFixed(2))
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