import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OrderFull } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderFull;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.orderService.getOrder(id)))
      .subscribe((order) => {
        loading.dismiss();
        this.order = order;
        console.log(this.order);
      });
  }

  changeDelivered(event: any) {
    this.isLoading = true;
    const delivered = event.detail.checked;
    this.orderService
      .changeDelivered(this.order.id, delivered)
      .subscribe((order) => {
        this.isLoading = false;
        console.log(order);
        if (order) {
          this.order.delivered = order.delivered;
        }
      });
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando datos, espere por favor',
      backdropDismiss: false,
    });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
