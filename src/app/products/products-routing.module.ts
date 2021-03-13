import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductComponent } from './pages/product/product.component';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'new', component: ProductNewComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
