import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { OrderFull, OrderStatus } from '../../interfaces/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { OrderService } from '../../services/order.service';
import { ModalController } from '@ionic/angular';
import { ModalNotificationComponent } from '../../components/modal-notification/modal-notification.component';
import { User } from 'src/app/auth/interfaces/interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderFull;
  isLoading = false;
  delivered = false;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.user = this.authService.user;
    this.authService.actUser$.subscribe((user) => (this.user = user));

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

  async sendNotification() {
    const modal = await this.modalController.create({
      component: ModalNotificationComponent,
      componentProps: {
        userId: this.order.user.id,
        orderId: this.order.id,
      },
    });
    return await modal.present();
  }
}
