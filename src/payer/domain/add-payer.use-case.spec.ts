import { FakeRoomStore } from "../../room/domain/fake-room.store"
import { Room } from "../../room/domain/room"
import { AddPayerUseCase } from "./add-payer.use-case"
import { FakePayerService } from "./fake-payer.service"

describe('AddPayerUseCase', () => {
    let addPayerUseCase: AddPayerUseCase
    let fakePayerService: FakePayerService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakePayerService = new FakePayerService()
        addPayerUseCase = new AddPayerUseCase(fakePayerService, fakeRoomStore)
    })

    it('should add payer', async () => {
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', []))
        const payerName = 'John'

        await addPayerUseCase.execute(payerName)

        expect(fakeRoomStore.getRoom()?.payers).toContain(fakePayerService.payer)
        expect(fakePayerService.roomId).toEqual(fakeRoomStore.getRoom()?.id)
        expect(fakePayerService.payerName).toEqual(payerName)
    })
})