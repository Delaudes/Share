import { InjectionToken } from "@angular/core";
import { Payer } from "../models/payer";


export interface PayerService {
    add(payerName: string, roomId: string): Promise<Payer>;
}

export const PAYER_SERVICE_TOKEN = new InjectionToken<PayerService>('PayerService')