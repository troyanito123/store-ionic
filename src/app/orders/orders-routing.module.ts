import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendOrderGuard } from './guard/send-order.guard';

import { OrdersPage } from './orders.page';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderSendComponent } from './pages/order-send/order-send.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
    children: [
      { path: 'list', component: OrderListComponent },
      {
        path: 'send',
        component: OrderSendComponent,
        canActivate: [SendOrderGuard],
      },
      { path: ':id', component: OrderComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
