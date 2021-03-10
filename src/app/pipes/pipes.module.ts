import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { LocalMoneyPipe } from './local-money.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, LocalMoneyPipe],
  exports: [DomSanitizerPipe, LocalMoneyPipe],
  imports: [CommonModule],
})
export class PipesModule {}
