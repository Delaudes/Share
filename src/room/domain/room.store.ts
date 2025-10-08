import { InjectionToken } from "@angular/core";
import { Expense } from "../../expense/expense";
import { Payer } from "../../payer/domain/payer";
import { ReactiveRoomStore } from "../infrastructure/reactive-room.store";
import { Room } from "./room";

export interface RoomStore {
    addExpense(expense: Expense, payerId: string): void;
    addPayer(payer: Payer): void;
    getRoom(): Room | undefined
    setRoom(room?: Room): void
}

export const ROOM_STORE_TOKEN = new InjectionToken<ReactiveRoomStore>('RoomStore')