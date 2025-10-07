import { provideZonelessChangeDetection } from "@angular/core";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { Payer } from "../domain/payer";
import { PayerComponent } from "./payer.component";

describe("PayerComponent", () => {
    let spectator: Spectator<PayerComponent>;

    const createComponent = createComponentFactory({
        component: PayerComponent,
        providers: [provideZonelessChangeDetection(),
        ],
    })

    beforeEach(() => {
        spectator = createComponent({
            props: {
                payer: new Payer('John')
            }
        })
    });

    it('should display payer name', () => {
        expect(spectator.query('[data-testid="payer"]')).toHaveText(spectator.component.payer().name)
    })
})