import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./pages/settings-list/settings-list.module').then(
            (m) => m.SettingsListPageModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      { path: '**', redirectTo: 'list' },
    ],
  },
  {
    path: 'settings-list',
    loadChildren: () =>
      import('./pages/settings-list/settings-list.module').then(
        (m) => m.SettingsListPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
