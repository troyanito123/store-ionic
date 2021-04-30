import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';
import { PipesModule } from '../pipes/pipes.module';

import { OrdersPage } from './orders.page';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderSendComponent } from './pages/order-send/order-send.component';
import { MapComponent } from './components/map/map.component';
import { DetailComponent } from './components/detail/detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ModalNotificationComponent } from './components/modal-notification/modal-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrdersPage,
    OrderListComponent,
    OrderSendComponent,
    OrderComponent,
    MapComponent,
    DetailComponent,
    MessagesComponent,
    ModalNotificationComponent,
  ],
})
export class OrdersPageModule {}
