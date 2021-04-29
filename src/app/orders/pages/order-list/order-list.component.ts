import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Order, OrderStatus } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy, ViewWillEnter {
  orders: Order[];
  user: User;

  orderSubs: Subscription;
  socketSubs: Subscription;
  userSubs: Subscription;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private utilsService: UtilsService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}
  async ionViewWillEnter() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.orderSubs = this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      loading.dismiss();
    });
  }

  async ngOnInit() {
    this.user = this.authService.user;
    this.userSubs = this.authService.actUser$.subscribe(
      (user) => (this.user = user)
    );
    if (this.user.role === 'ADMIN') {
      this.socketSubs = this.socketSubs = this.socketService
        .listen('new-order')
        .subscribe((res: Order) => {
          this.orders.unshift(res);
        });
    }
  }

  ngOnDestroy() {
    this.orderSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
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

  colorStatus(status: OrderStatus) {
    if (status === OrderStatus.new) {
      return 'tertiary';
    } else if (status === OrderStatus.pending) {
      return 'warning';
    } else if (status === OrderStatus.delivered) {
      return 'success';
    }
  }
}
