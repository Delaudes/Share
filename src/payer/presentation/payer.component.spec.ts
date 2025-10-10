import { provideZonelessChangeDetection } from "@angular/core";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { AddExpenseUseCase } from "../../expense/domain/add-expense.use-case";
import { ExpenseDraft } from "../../expense/domain/expense-draft";
import { FakeExpenseService } from "../../expense/domain/fake-expense.service";
import { Room } from "../../room/domain/room";
import { ReactiveRoomStore } from "../../room/infrastructure/reactive-room.store";
import { Payer } from "../domain/payer";
import { PayerComponent } from "./payer.component";

describe("PayerComponent", () => {
    let spectator: Spectator<PayerComponent>;

    let fakeExpenseService: FakeExpenseService
    let reactiveRoomStore: ReactiveRoomStore
    let addExpenseUseCase: AddExpenseUseCase

    const createComponent = createComponentFactory({
        component: PayerComponent,
        providers: [provideZonelessChangeDetection(),
        {
            provide: AddExpenseUseCase,
            useFactory: () => addExpenseUseCase
        },
        ],
    })

    beforeEach(() => {
        fakeExpenseService = new FakeExpenseService()
        reactiveRoomStore = new ReactiveRoomStore()
        reactiveRoomStore.setRoom(new Room('room-002', 'Holidays', [new Payer('payer-001', 'John', [])]))
        addExpenseUseCase = new AddExpenseUseCase(fakeExpenseService, reactiveRoomStore)

        spectator = createComponent({
            props: {
                payer: new Payer('payer-001', 'John', [])
            }
        })
    });

    it('should display payer name', () => {
        expect(spectator.query('[data-testid="payer"]')).toHaveText(spectator.component.payer().name)
    })

    it('should add expense', async () => {
        const expenseName = 'Pizzas'
        const expenseAmount = 26

        spectator.typeInElement(expenseName, '[data-testid="expense-name"]')
        spectator.typeInElement(expenseAmount.toString(), '[data-testid="expense-amount"]')
        await clickAndWait('[data-testid="add-expense"]');

        expect(fakeExpenseService.expenseDraft).toEqual(new ExpenseDraft(expenseName, expenseAmount, spectator.component.payer().id))
    })

    async function clickAndWait(selector: string) {
        spectator.click(selector);
        await Promise.resolve();
        await Promise.resolve();
        spectator.detectChanges()
    }
})