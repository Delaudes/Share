import { Room } from "./room";

export interface RoomService {
    create(): Promise<Room>
}