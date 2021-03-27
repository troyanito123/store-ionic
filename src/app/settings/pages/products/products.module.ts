import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ProductNewImagesComponent } from './components/product-new-images/product-new-images.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProductsPageRoutingModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    ProductsPage,
    ProductListComponent,
    ProductComponent,
    ProductNewComponent,
    ProductFormComponent,
    ProductImagesComponent,
    ProductNewImagesComponent,
  ],
})
export class ProductsPageModule {}
