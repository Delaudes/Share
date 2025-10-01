import { FakeRoomService } from "./fake-room.service"
import { GetRoomListUseCase } from "./get-room-list.use-case"

describe('GetRoomListUseCase', () => {
    let getRoomListUseCase: GetRoomListUseCase
    let fakeRoomService: FakeRoomService

    beforeEach(() => {
        fakeRoomService = new FakeRoomService()
        getRoomListUseCase = new GetRoomListUseCase(fakeRoomService)
    })

    it('should create room', async () => {
        const roomList = await getRoomListUseCase.execute()

        expect(roomList).toEqual(fakeRoomService.roomList)
    })
})