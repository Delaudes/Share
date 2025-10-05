import { LocalStorageService } from "./local-storage.service";

export class FakeLocalStorageService implements LocalStorageService {
    key?: string
    newItem?: string

    item? = '[{"id":"room-002","name":"Roomate","payers":[]}]'

    setItem(key: string, value: string): void {
        this.key = key
        this.newItem = value
    }

    getItem(key: string): string | undefined {
        this.key = key

        return this.item
    }

}