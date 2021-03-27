import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productSubs: Subscription;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    this.productSubs = this.productService
      .getProductForAdmin()
      .subscribe((products) => {
        loading.dismiss();
        this.products = products;
      });
  }

  ngOnDestroy() {
    this.productSubs?.unsubscribe();
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando datos, espere por favor!',
      backdropDismiss: false,
    });
  }

  doRefresh(event: any) {
    this.productSubs = this.productService
      .getProductForAdmin()
      .subscribe((products) => {
        this.products = products;
        event.target.complete();
      });
  }
}
