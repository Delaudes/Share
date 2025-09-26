import { LocalStorageService } from "./local-storage.service";

export class FakeLocalStorageService implements LocalStorageService {
    key?: string
    room?: string

    setItem(key: string, value: string): void {
        this.key = key
        this.room = value
    }

}