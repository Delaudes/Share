import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amount'
})
export class AmountPipe implements PipeTransform {
    transform(value?: number): string {
        if (!value) return '';
        return value.toFixed(2);
    }
}
