import { Payer } from "../../../payer/domain/models/payer"
import { FakeRoomStore } from "../../../room/domain/fakes/fake-room.store"
import { Room } from "../../../room/domain/models/room"
import { FakeExpenseService } from "../fakes/fake-expense.service"
import { ExpenseDraft } from "../models/expense-draft"
import { AddExpenseUseCase } from "./add-expense.use-case"

describe('AddExpenseUseCase', () => {
    let addExpenseUseCase: AddExpenseUseCase
    let fakeExpenseService: FakeExpenseService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', [new Payer('payer-001', 'John', [])]))
        fakeExpenseService = new FakeExpenseService()
        addExpenseUseCase = new AddExpenseUseCase(fakeExpenseService, fakeRoomStore)
    })

    it('should add expense', async () => {
        const expenseDraft = new ExpenseDraft('Pizzas', 26, 'payer-001')

        await addExpenseUseCase.execute(expenseDraft)

        expect(fakeRoomStore.getRoom()?.findPayer(expenseDraft.payerId)?.expenses).toContain(fakeExpenseService.expense)
        expect(fakeExpenseService.roomId).toEqual(fakeRoomStore.getRoom()?.id)
        expect(fakeExpenseService.expenseDraft).toEqual(expenseDraft)
    })
})