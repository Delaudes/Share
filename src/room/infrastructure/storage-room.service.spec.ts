import { Builder } from "builder-pattern"
import { FakeLocalStorageService } from "../../local-storage/fake-local-storage.service"
import { FakeUuidService } from "../../uuid/fake-uuid.service"
import { Room } from "../domain/room"
import { StorageRoomService } from "./storage-room.service"

describe('StorageRoomService', () => {
    const fakeLocalStorageService = new FakeLocalStorageService()
    const fakeUuidService = new FakeUuidService()
    const storageRoomService = new StorageRoomService(fakeLocalStorageService, fakeUuidService)

    it('should create store room', async () => {
        const room = await storageRoomService.create()

        expect(room).toEqual(Builder<Room>().id(fakeUuidService.uuid).build())
        expect(fakeLocalStorageService.key).toEqual(room.id)
        expect(fakeLocalStorageService.room).toEqual('{"id":"uuid-001"}')
    })
})