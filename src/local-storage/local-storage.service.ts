import { InjectionToken } from "@angular/core"

export interface LocalStorageService {
    setItem(key: string, value: string): void
    getItem(key: string): string | undefined
}

export const LOCAL_STORAGE_SERVICE_TOKEN = new InjectionToken<LocalStorageService>('LocalStorageService')