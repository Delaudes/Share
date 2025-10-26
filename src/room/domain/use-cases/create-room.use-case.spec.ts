import { FakeRoomService } from "../fakes/fake-room.service"
import { CreateRoomUseCase } from "./create-room.use-case"

describe('CreateRoomUseCase', () => {
    let createRoomUseCase: CreateRoomUseCase
    let fakeRoomService: FakeRoomService

    beforeEach(() => {
        fakeRoomService = new FakeRoomService()
        createRoomUseCase = new CreateRoomUseCase(fakeRoomService)
    })

    it('should create room', async () => {
        const roomName = 'Holidays'

        const room = await createRoomUseCase.execute(roomName)

        expect(room).toEqual(fakeRoomService.room)
        expect(fakeRoomService.roomName).toEqual(roomName)
    })
})