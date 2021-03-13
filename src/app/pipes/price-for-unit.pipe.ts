import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/interfaces/interface';

@Pipe({
  name: 'priceForUnit',
})
export class PriceForUnitPipe implements PipeTransform {
  transform(value: Product): string {
    return `Bs. ${value.price} por ${value.unit.name}`;
  }
}
