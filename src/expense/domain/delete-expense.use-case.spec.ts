import { Payer } from "../../payer/domain/payer"
import { FakeRoomStore } from "../../room/domain/fake-room.store"
import { Room } from "../../room/domain/room"
import { DeleteExpenseUseCase } from "./delete-expense.use-case"
import { Expense } from "./expense"
import { FakeExpenseService } from "./fake-expense.service"

describe('DeleteExpenseUseCase', () => {
    let deleteExpenseUseCase: DeleteExpenseUseCase
    let fakeExpenseService: FakeExpenseService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', [new Payer('payer-001', 'John', [new Expense('expense-001', 'Pizzas', 26)])]))
        fakeExpenseService = new FakeExpenseService()
        deleteExpenseUseCase = new DeleteExpenseUseCase(fakeExpenseService, fakeRoomStore)
    })

    it('should delete expense', async () => {
        const expenseId = 'expense-001'

        await deleteExpenseUseCase.execute(expenseId)

        expect(fakeRoomStore.getRoom()?.findPayer('payer-001')?.expenses).not.toContain(new Expense('expense-001', 'Pizzas', 26))
        expect(fakeExpenseService.expenseId).toEqual(expenseId)

    })
})