import { InjectionToken } from "@angular/core";
import { Room } from "./room";
import { RoomList } from "./room-list";

export interface RoomService {
    create(name: string): Promise<Room>
    fetch(id: string): Promise<Room | undefined>
    fetchAll(): Promise<RoomList>
}

export const ROOM_SERVICE_TOKEN = new InjectionToken<RoomService>('RoomService')