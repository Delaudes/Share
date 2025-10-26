import { InjectionToken } from "@angular/core";
import { Room } from "../models/room";
import { RoomList } from "../models/room-list";

export interface RoomService {
    create(roomName: string): Promise<Room>
    fetch(roomId: string): Promise<Room | undefined>
    fetchAll(): Promise<RoomList>
}

export const ROOM_SERVICE_TOKEN = new InjectionToken<RoomService>('RoomService')