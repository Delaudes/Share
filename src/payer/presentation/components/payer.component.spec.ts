import { provideZonelessChangeDetection } from "@angular/core";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { FakeExpenseService } from "../../../expense/domain/fakes/fake-expense.service";
import { ExpenseDraft } from "../../../expense/domain/models/expense-draft";
import { AddExpenseUseCase } from "../../../expense/domain/use-cases/add-expense.use-case";
import { DeleteExpenseUseCase } from "../../../expense/domain/use-cases/delete-expense.use-case";
import { ExpenseComponent } from "../../../expense/presentation/components/expense.component";
import { Room } from "../../../room/domain/models/room";
import { ReactiveRoomStore } from "../../../room/infrastructure/adapters/stores/reactive-room.store";
import { Payer } from "../../domain/models/payer";
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
        ...provideChildrensDependencies()
        ],
    })

    beforeEach(() => {
        fakeExpenseService = new FakeExpenseService()
        reactiveRoomStore = new ReactiveRoomStore()
        reactiveRoomStore.setRoom(new Room('room-002', 'Holidays', [new Payer('payer-001', 'John', [])]))
        addExpenseUseCase = new AddExpenseUseCase(fakeExpenseService, reactiveRoomStore)

        spectator = createComponent({
            props: {
                payer: reactiveRoomStore.getRoom()!.payers[0]
            }
        })
    });

    it('should display payer', () => {
        expect(spectator.query('[data-testid="payer"]')).toHaveText(spectator.component.payer().name)
        expect(spectator.query('[data-testid="payer"]')).toHaveText(spectator.component.payer().expenses.length.toString())
        expect(spectator.query('[data-testid="payer"]')).toHaveText(spectator.component.payer().calculateTotalExpenses().toString())
    })

    it('should add expense', async () => {
        const expenseName = 'Pizzas'
        const expenseAmount = 26

        spectator.typeInElement(expenseName, '[data-testid="expense-name"]')
        spectator.typeInElement(expenseAmount.toString(), '[data-testid="expense-amount"]')
        await clickAndWait('[data-testid="add-expense"]');

        expect(fakeExpenseService.expenseDraft).toEqual(new ExpenseDraft(expenseName, expenseAmount, spectator.component.payer().id))
    })

    it('should display expenses', async () => {
        expect(spectator.queryAll(ExpenseComponent).length).toEqual(0)

        await clickAndWait('[data-testid="add-expense"]');

        expect(spectator.queryAll(ExpenseComponent).length).toEqual(1)

        await clickAndWait('[data-testid="add-expense"]');

        expect(spectator.queryAll(ExpenseComponent).length).toEqual(2)
    })

    function provideChildrensDependencies() {
        return [

            {
                provide: DeleteExpenseUseCase,
                useFactory: () => new DeleteExpenseUseCase(new FakeExpenseService(), reactiveRoomStore)
            }]
    }

    async function clickAndWait(selector: string) {
        spectator.click(selector);
        await new Promise(resolve => setTimeout(resolve, 0));
        spectator.setInput('payer', reactiveRoomStore.room()!.payers[0]);
    }
})