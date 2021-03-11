import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class SendOrderGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private router: Router,
    private toastController: ToastController
  ) {}

  canActivate(): boolean {
    if (this.cartService.cantInCart < 1) {
      this.router.navigate(['/cart']).then(async () => {
        const toast = await this.toastController.create({
          duration: 2500,
          message: 'Tiene que tener algo en su carrito!',
        });
        toast.present();
      });
      return false;
    }
    return true;
  }
}
