import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersPageModule),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      { path: '', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}