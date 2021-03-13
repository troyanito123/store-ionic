import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Product } from '../../interfaces/interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    this.productService.getProductForAdmin().subscribe((products) => {
      loading.dismiss();
      this.products = products;
    });
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando datos, espere por favor!',
      backdropDismiss: false,
    });
  }
}
