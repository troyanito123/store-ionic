import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  createLoading(message = 'Cargando datos, espere por favor!') {
    return this.loadingController.create({
      message,
      backdropDismiss: false,
    });
  }

  createAlert(header = 'Error', message = 'Ocurrio un error') {
    return this.alertController.create({
      message,
      header,
      backdropDismiss: false,
      buttons: ['Ok'],
    });
  }

  createToast(message = 'mensaje del toast') {
    return this.toastController.create({
      message,
      duration: 2500,
      position: 'top',
    });
  }
}
