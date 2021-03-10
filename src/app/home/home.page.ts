import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Product } from './interfaces/interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    await loading.present();
    this.productService.getProducts().subscribe(async (products) => {
      await loading.dismiss();
      this.products = products;
      console.log(products);
    });
  }

  async createLoading() {
    return await this.loadingController.create({
      message: 'Cargando productos ...',
      backdropDismiss: false,
    });
  }
}
