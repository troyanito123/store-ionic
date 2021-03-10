import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../home/interfaces/interface';

@Pipe({
  name: 'localMoney',
})
export class LocalMoneyPipe implements PipeTransform {
  transform(value: number): string {
    return `Bs. ${value}`;
  }
}
