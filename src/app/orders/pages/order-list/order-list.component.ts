import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Order } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy, ViewWillEnter {
  orders: Order[];

  orderSubs: Subscription;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private utilsService: UtilsService
  ) {}
  async ionViewWillEnter() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.orderSubs = this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      loading.dismiss();
    });
  }

  async ngOnInit() {}

  ngOnDestroy() {
    this.orderSubs?.unsubscribe();
  }

  goToOrder(id: number) {
    this.router.navigate(['tabs/orders', id]);
  }

  doRefresh(event: any) {
    this.orderSubs = this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      event.target.complete();
    });
  }
}
