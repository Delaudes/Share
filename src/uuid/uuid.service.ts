import { InjectionToken } from "@angular/core"

export interface UuidService {
    generate(): string
}

export const UUID_SERVICE_TOKEN = new InjectionToken<UuidService>('UuidService')