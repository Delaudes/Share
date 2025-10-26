import { Expense } from "../../../expense/domain/models/expense";
import { Payer } from "../../../payer/domain/models/payer";
import { Room } from "../../domain/models/room";

export function mapToRooms(stringRooms?: string): Room[] {
    const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : [];
    const rooms = parsedRooms.map(parsedRoom => {
        return new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers.map(parsedPayer => {
            return new Payer(parsedPayer.id, parsedPayer.name, parsedPayer.expenses.map((parsedExpense: Expense) => {
                return new Expense(parsedExpense.id, parsedExpense.name, parsedExpense.amount) ?? [];
            }));
        }));
    });
    return rooms;
}
