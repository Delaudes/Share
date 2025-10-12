import { Expense } from "../../expense/domain/expense";
import { Payer } from "../../payer/domain/payer";
import { Balance } from "./balence";
import { Payment } from "./payment";

export class Room {
    constructor(readonly id: string, readonly name: string, readonly payers: Payer[]) { }

    is(roomId: string): boolean {
        return this.id === roomId
    }

    addPayer(payer: Payer): Room {
        this.payers.push(payer)
        return new Room(this.id, this.name, this.payers)
    }

    findPayer(payerId: string): Payer | undefined {
        return this.payers.find((payer) => payer.is(payerId))
    }

    addExpense(expense: Expense, payerId: string): Room {
        this.findPayer(payerId)?.addExpense(expense)
        return new Room(this.id, this.name, this.payers)
    }

    deleteExpense(expenseId: string): Room {
        this.payers.forEach((payer) => payer.deleteExpense(expenseId))
        return new Room(this.id, this.name, this.payers)
    }

    calculateBalance(): Balance {
        const balance = new Balance([])
        const averageExpenses = this.calculateAverageExpensesPerPayer()

        const payersOwing: { payer: Payer, amount: number }[] = []
        const payersReceiving: { payer: Payer, amount: number }[] = []
        this.payers.forEach(payer => {
            const difference = payer.calculateDifference(averageExpenses)
            if (difference < 0) {
                payersOwing.push({ payer, amount: -difference })
            } else if (difference > 0) {
                payersReceiving.push({ payer, amount: difference })
            }
        })

        let i = 0, j = 0;
        while (i < payersOwing.length && j < payersReceiving.length) {
            const owing = payersOwing[i];
            const receiving = payersReceiving[j];
            const paymentAmount = Math.min(owing.amount, receiving.amount);

            balance.addPayment(new Payment(owing.payer.name, receiving.payer.name, paymentAmount));
            owing.amount -= paymentAmount;
            receiving.amount -= paymentAmount;

            if (owing.amount === 0) i++;
            if (receiving.amount === 0) j++;
        }
        return balance
    }

    calculateTotalExpenses(): number {
        return this.payers.reduce((sum, payer) => {
            return sum + payer.calculateTotalExpenses()
        }, 0)
    }

    calculateAverageExpensesPerPayer(): number {
        return this.calculateTotalExpenses() / this.payers.length
    }
}