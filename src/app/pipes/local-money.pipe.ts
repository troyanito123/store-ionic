import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../home/interfaces/interface';

@Pipe({
  name: 'localMoney',
})
export class LocalMoneyPipe implements PipeTransform {
  transform(value: Product): string {
    return `Bs. ${value.price} por ${value.unit.name}`;
  }
}
