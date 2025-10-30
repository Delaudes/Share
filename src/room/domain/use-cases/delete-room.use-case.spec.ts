import { FakeRoomService } from "../fakes/fake-room.service"
import { DeleteRoomUseCase } from "./delete-room.use-case"

describe('DeleteRoomUseCase', () => {
    let deleteRoomUseCase: DeleteRoomUseCase
    let fakeRoomService: FakeRoomService

    beforeEach(() => {
        fakeRoomService = new FakeRoomService()
        deleteRoomUseCase = new DeleteRoomUseCase(fakeRoomService)
    })

    it('should delete room', async () => {
        const roomId = 'room-001'

        await deleteRoomUseCase.execute(roomId)

        expect(fakeRoomService.deletedRoomId).toEqual(roomId)
    })
})
