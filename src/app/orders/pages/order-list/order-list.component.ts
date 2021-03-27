import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Order } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[];

  orderSubs: Subscription;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    this.orderSubs = this.orderService.getOrders().subscribe((orders) => {
      loading.dismiss();
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.orderSubs?.unsubscribe();
  }

  goToOrder(id: number) {
    this.router.navigate(['tabs/orders', id]);
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando data, espere por favor',
      backdropDismiss: false,
    });
  }

  doRefresh(event: any) {
    this.orderSubs = this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      event.target.complete();
    });
  }
}
