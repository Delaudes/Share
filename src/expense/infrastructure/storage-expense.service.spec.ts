import { FakeLocalStorageService } from "../../local-storage/fake-local-storage.service"
import { FakeUuidService } from "../../uuid/fake-uuid.service"
import { Expense } from "../domain/expense"
import { ExpenseDraft } from "../domain/expense-draft"
import { StorageExpenseService } from "./storage-expense.service"

describe('StorageExpenseService', () => {
    let storageExpenseService: StorageExpenseService
    let fakeLocalStorageService: FakeLocalStorageService
    let fakeUuidService: FakeUuidService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        fakeUuidService = new FakeUuidService()
        storageExpenseService = new StorageExpenseService(fakeLocalStorageService, fakeUuidService)
    })

    it('should add expense to room in storage', async () => {
        const expenseDraft = new ExpenseDraft('Pizza', 26, 'payer-001')
        const roomId = 'room-002'

        const expense = await storageExpenseService.add(expenseDraft, roomId)

        expect(expense).toEqual(new Expense(fakeUuidService.uuid, expenseDraft.name, expenseDraft.amount))
        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"Roomate","payers":[{"id":"${expenseDraft.payerId}","name":"Alice","expenses":[{"id":"${fakeUuidService.uuid}","name":"${expenseDraft.name}","amount":${expenseDraft.amount}}]}]}]`)
    })
})