import { FakeLocalStorageService } from "../../local-storage/fake-local-storage.service"
import { Payer } from "../domain/payer"
import { StoragePayerService } from "./storage-payer.service"

describe('StoragePayerService', () => {
    let storagePayerService: StoragePayerService
    let fakeLocalStorageService: FakeLocalStorageService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        storagePayerService = new StoragePayerService(fakeLocalStorageService)
    })

    it('should add payer to room in storage', async () => {
        const payerName = 'John'
        const roomId = 'room-002'

        const payer = await storagePayerService.add(payerName, roomId)

        expect(payer).toEqual(new Payer(payerName))
        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"Roomate","payers":[{"name":"${payerName}"}]}]`)
    })
})