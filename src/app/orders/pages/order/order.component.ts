import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { OrderFull, OrderStatus } from '../../interfaces/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderFull;
  isLoading = false;
  delivered = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  async ngOnInit() {
    const loading = await this.utilsService.createLoading();
    loading.present();
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.orderService.getOrder(id)))
      .subscribe((order) => {
        this.order = order;
        if (order.status === OrderStatus.new) {
          this.orderService
            .changeStatus(order.id, OrderStatus.pending)
            .subscribe(() => loading.dismiss());
        } else {
          this.delivered = this.order.status === OrderStatus.delivered;
          loading.dismiss();
        }
      });
  }

  changeDelivered(event: any) {
    this.isLoading = true;
    const delivered = event.detail.checked;
    const status = delivered ? OrderStatus.delivered : OrderStatus.pending;

    this.orderService.changeStatus(this.order.id, status).subscribe((order) => {
      this.isLoading = false;
      if (order) {
        this.order.status = order.status;
        this.delivered = this.order.status === OrderStatus.delivered;
      }
    });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
