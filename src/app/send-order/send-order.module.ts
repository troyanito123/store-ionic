import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendOrderPageRoutingModule } from './send-order-routing.module';

import { SendOrderPage } from './send-order.page';
import { MapComponent } from './components/map/map.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SendOrderPageRoutingModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [SendOrderPage, MapComponent, DetailComponent],
})
export class SendOrderPageModule {}
