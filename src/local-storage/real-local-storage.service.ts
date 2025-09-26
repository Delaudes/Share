import { LocalStorageService } from "./local-storage.service";

export class RealLocalStorageService implements LocalStorageService {
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }
}