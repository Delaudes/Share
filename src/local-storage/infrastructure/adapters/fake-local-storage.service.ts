import { LocalStorageService } from "../ports/local-storage.service";

export class FakeLocalStorageService implements LocalStorageService {
    key?: string
    newItem?: string

    item? = '[{"id":"room-002","name":"Roomate","payers":[{"id":"payer-001","name":"Alice","expenses":[{"id":"expense-001","name":"Groceries","amount":50}]}]}]'

    setItem(key: string, value: string): void {
        this.key = key
        this.newItem = value
    }

    getItem(key: string): string | undefined {
        this.key = key

        return this.item
    }

}