import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Order } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Order[];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    this.orderService.getOrders().subscribe((orders) => {
      loading.dismiss();
      this.orders = orders;
    });
  }

  goToOrder(id: number) {
    this.router.navigate(['/orders', id]);
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando data, espere por favor',
      backdropDismiss: false,
    });
  }
}
