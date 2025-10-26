import { InjectionToken } from "@angular/core";


export interface RouterService {
    navigate(path: string): void
    getParamValue(paramName: string): string | undefined
}

export const ROUTER_SERVICE_TOKEN = new InjectionToken<RouterService>('RouterService')