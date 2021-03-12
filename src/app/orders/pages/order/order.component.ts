import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { OrderFull } from '../../interfaces/interfaces';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderFull;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private loadingController: LoadingController
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
    console.log(event.detail.checked);
  }

  createLoading() {
    return this.loadingController.create({
      message: 'Cargando datos, espere por favor',
      backdropDismiss: false,
    });
  }
}
