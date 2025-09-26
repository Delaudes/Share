import { CreateRoomUseCase } from "./create-room.use-case"
import { FakeRoomService } from "./fake-room.service"

describe('CreateRoomUseCase', () => {
    const fakeRoomService = new FakeRoomService()
    const createRoomUseCase = new CreateRoomUseCase(fakeRoomService)

    it('should create room', async () => {
        const room = await createRoomUseCase.execute()

        expect(room).toEqual(fakeRoomService.room)
    })
})