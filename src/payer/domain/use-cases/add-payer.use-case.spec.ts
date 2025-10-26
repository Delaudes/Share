import { FakeRoomStore } from "../../../room/domain/fakes/fake-room.store"
import { Room } from "../../../room/domain/models/room"
import { FakePayerService } from "../fakes/fake-payer.service"
import { AddPayerUseCase } from "./add-payer.use-case"

describe('AddPayerUseCase', () => {
    let addPayerUseCase: AddPayerUseCase
    let fakePayerService: FakePayerService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', []))
        fakePayerService = new FakePayerService()
        addPayerUseCase = new AddPayerUseCase(fakePayerService, fakeRoomStore)
    })

    it('should add payer', async () => {
        const payerName = 'John'

        await addPayerUseCase.execute(payerName)

        expect(fakeRoomStore.getRoom()?.payers).toContain(fakePayerService.payer)
        expect(fakePayerService.roomId).toEqual(fakeRoomStore.getRoom()?.id)
        expect(fakePayerService.payerName).toEqual(payerName)
    })
})