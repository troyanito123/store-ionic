import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { LocalMoneyPipe } from './local-money.pipe';
import { PriceForUnitPipe } from './price-for-unit.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    DomSanitizerPipe,
    LocalMoneyPipe,
    PriceForUnitPipe,
    SafeUrlPipe,
  ],
  exports: [DomSanitizerPipe, LocalMoneyPipe, PriceForUnitPipe, SafeUrlPipe],
  imports: [CommonModule],
})
export class PipesModule {}
