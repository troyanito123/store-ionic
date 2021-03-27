import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localMoney',
})
export class LocalMoneyPipe implements PipeTransform {
  transform(value: number): string {
    return `Bs. ${value}`;
  }
}
