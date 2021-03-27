import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { HomeGuard } from '../guards/home.guard';

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
        canActivate: [HomeGuard],
        canLoad: [HomeGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
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
