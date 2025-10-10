import { FakeLocalStorageService } from "../../local-storage/fake-local-storage.service"
import { FakeUuidService } from "../../uuid/fake-uuid.service"
import { Payer } from "../domain/payer"
import { StoragePayerService } from "./storage-payer.service"

describe('StoragePayerService', () => {
    let storagePayerService: StoragePayerService
    let fakeLocalStorageService: FakeLocalStorageService
    let fakeUuidService: FakeUuidService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        fakeUuidService = new FakeUuidService()
        storagePayerService = new StoragePayerService(fakeLocalStorageService, fakeUuidService)
    })

    it('should add payer to room in storage', async () => {
        const payerName = 'John'
        const roomId = 'room-002'

        const payer = await storagePayerService.add(payerName, roomId)

        expect(payer).toEqual(new Payer(fakeUuidService.uuid, payerName, []))
        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"Roomate","payers":[{"id":"payer-001","name":"Alice","expenses":[]},{"id":"${fakeUuidService.uuid}","name":"${payerName}","expenses":[]}]}]`)
    })
})