import { FakeRoomService } from "../fakes/fake-room.service"
import { FakeRoomStore } from "../fakes/fake-room.store"
import { LoadRoomUseCase } from "./load-room.use-case"

describe('LoadRoomUseCase', () => {
    let loadRoomUseCase: LoadRoomUseCase
    let fakeRoomService: FakeRoomService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakeRoomService = new FakeRoomService()
        loadRoomUseCase = new LoadRoomUseCase(fakeRoomService, fakeRoomStore)
    })

    it('should load room', async () => {
        const roomId = 'room-001'

        await loadRoomUseCase.execute(roomId)

        expect(fakeRoomService.roomId).toEqual(roomId)
        expect(fakeRoomStore.getRoom()).toEqual(fakeRoomService.room)
    })
})