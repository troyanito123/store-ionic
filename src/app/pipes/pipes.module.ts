import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { LocalMoneyPipe } from './local-money.pipe';
import { PriceForUnitPipe } from './price-for-unit.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, LocalMoneyPipe, PriceForUnitPipe],
  exports: [DomSanitizerPipe, LocalMoneyPipe, PriceForUnitPipe],
  imports: [CommonModule],
})
export class PipesModule {}
