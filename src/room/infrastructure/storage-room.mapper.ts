import { Expense } from "../../expense/domain/expense";
import { Payer } from "../../payer/domain/payer";
import { Room } from "../domain/room";

export function mapToRooms(stringRooms?: string): Room[] {
    const parsedRooms: Room[] = stringRooms ? JSON.parse(stringRooms) : [];
    const rooms = parsedRooms.map(parsedRoom => {
        return new Room(parsedRoom.id, parsedRoom.name, parsedRoom.payers.map(parsedPayer => {
            return new Payer(parsedPayer.id, parsedPayer.name, parsedPayer.expenses.map(parsedExpense => {
                return new Expense(parsedExpense.id, parsedExpense.name, parsedExpense.amount) ?? [];
            }));
        }));
    });
    return rooms;
}
