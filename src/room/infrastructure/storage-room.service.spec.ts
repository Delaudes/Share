import { Builder } from "builder-pattern"
import { FakeLocalStorageService } from "../../local-storage/fake-local-storage.service"
import { FakeUuidService } from "../../uuid/fake-uuid.service"
import { Room } from "../domain/room"
import { RoomList } from "../domain/room-list"
import { StorageRoomService } from "./storage-room.service"

describe('StorageRoomService', () => {
    let storageRoomService: StorageRoomService
    let fakeLocalStorageService: FakeLocalStorageService
    let fakeUuidService: FakeUuidService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        fakeUuidService = new FakeUuidService()
        storageRoomService = new StorageRoomService(fakeLocalStorageService, fakeUuidService)
    })

    it('should create room in storage', async () => {
        const roomName = 'Holidays'

        const room = await storageRoomService.create(roomName)

        expect(room).toEqual(Builder<Room>().id(fakeUuidService.uuid).name(roomName).build())
        expect(fakeLocalStorageService.key).toEqual('rooms')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"room-002","name":"Roomate"},{"id":"room-001","name":"${roomName}"}]`)
    })

    it('should create first room in storage', async () => {
        const roomName = 'Holidays'
        fakeLocalStorageService.item = undefined

        await storageRoomService.create('Holidays')

        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"room-001","name":"${roomName}"}]`)
    })

    it('should fetch room from storage', async () => {
        const roomId = 'room-002'

        const room = await storageRoomService.fetch(roomId)

        expect(room).toBeDefined()
        expect(fakeLocalStorageService.key).toEqual('rooms')
    })

    it('should fetch undefined room from storage', async () => {
        fakeLocalStorageService.item = undefined

        const room = await storageRoomService.fetch('room-002')

        expect(room).toBeUndefined()
    })

    it('should fetch roomList from storage', async () => {
        const roomList = await storageRoomService.fetchAll()

        expect(roomList).toBeDefined()
        expect(fakeLocalStorageService.key).toEqual('rooms')
    })

    it('should fetch undefined roomList from storage', async () => {
        fakeLocalStorageService.item = undefined

        const roomList = await storageRoomService.fetchAll()

        expect(roomList).toEqual(new RoomList([]))
    })
})