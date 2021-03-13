import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private loadingController: LoadingController) {}

  createLoading(message = 'Cargando datos, espere por favor!') {
    return this.loadingController.create({
      message,
      backdropDismiss: false,
    });
  }
}
