import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../../home/interfaces/interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-send',
  templateUrl: './order-send.component.html',
  styleUrls: ['./order-send.component.scss'],
})
export class OrderSendComponent implements OnInit {
  products: Product[] = [];
  cost = 0;
  location: string;
  alert: HTMLIonAlertElement;

  addressField: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.products = this.cartService.cart;
    this.cost = this.cartService.costCart;
  }

  async sendOrder() {
    this.location = this.cartService.location;
    if (this.addressField.invalid || this.products.length < 1) {
      if (!this.location) {
        this.alert = await this.createAlert(
          'Ubicacion',
          'Mueve el marcador del mapa al lugar donde te llevaremos el pedido'
        );
        this.alert.present();
      }
      this.addressField.markAllAsTouched();
      return;
    }
    const loading = await this.createLoading(
      'Creando order, espere por favor.'
    );
    loading.present();
    this.orderService
      .sendOrder(
        this.products,
        this.addressField.value,
        this.location,
        this.cost
      )
      .subscribe(async (success) => {
        loading.dismiss();
        if (success) {
          this.cartService.deleteCart();
          this.addressField.reset();
          this.router.navigate(['/home']).then(async () => {
            const toast = await this.createToast(
              'Tu pedido esta siendo procesado!'
            );
            toast.present();
          });
        } else {
          const alert = await this.createAlert(
            'Ha ocurrido un error',
            'Intentelo de nuevo por favor'
          );
          alert.present();
        }
      });
  }

  async createAlert(header: string, message: string) {
    return await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
  }

  createLoading(message: string) {
    return this.loadingController.create({
      message,
      backdropDismiss: false,
    });
  }

  createToast(message: string) {
    return this.toastController.create({
      message,
      duration: 3000,
      position: 'middle',
    });
  }

  isInvalidAddress() {
    return this.addressField.invalid && this.addressField.touched;
  }

  get errorLocationMsg(): string {
    const errors = this.addressField.errors;
    if (errors?.required) {
      return 'Donde te llevaremos el pedido?';
    } else if (errors?.minlength) {
      return 'Detalla un poco mas tu direccion';
    }
    return '';
  }
}
