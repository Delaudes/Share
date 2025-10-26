import { LocalStorageService } from "../../infrastructure/ports/local-storage.service";

export class RealLocalStorageService implements LocalStorageService {

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    getItem(key: string): string | undefined {
        return localStorage.getItem(key) ?? undefined
    }
}