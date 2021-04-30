import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss'],
})
export class ModalNotificationComponent implements OnInit {
  @Input() userId: number;
  @Input() orderId: number;

  notificationForm: FormGroup;

  isLoading = false;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private notificationServie: NotificationService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  sendNotification() {
    if (this.notificationForm.invalid) {
      this.notificationForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const { title, body } = this.notificationForm.value;

    this.notificationServie
      .sendNotificationToUser(this.userId, this.orderId, title, body)
      .subscribe(async (success) => {
        this.isLoading = false;
        if (success) {
          this.modalController.dismiss().then(async () => {
            const toast = await this.utilsService.createToast(
              'Se envio la notificacion satisfactoriamente!'
            );
            toast.present();
          });
        } else {
          this.modalController.dismiss().then(async () => {
            const alert = await this.utilsService.createAlert(
              'No se envio la notificacion',
              'Puede que el usurio no tenga activado el servicio de notificaciones.'
            );
            alert.present();
          });
        }
      });
  }

  modalDissmiss() {
    this.modalController.dismiss();
  }

  private createForm() {
    this.notificationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      body: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  invalidField(field: string) {
    return (
      this.notificationForm.get(field).invalid &&
      this.notificationForm.get(field).touched
    );
  }

  get invalidTitleMsg(): string {
    const errors = this.notificationForm.get('title').errors;
    if (errors?.required) {
      return 'Titulo es obligatorio';
    } else if (errors?.minlength) {
      return 'Titulo debe tener minimo 6 carateres';
    }
    return '';
  }

  get invalidBodyMsg(): string {
    const errors = this.notificationForm.get('body').errors;
    if (errors?.required) {
      return 'Cuerpo es obligatorio';
    } else if (errors?.minlength) {
      return 'Cuerpo debe tener minimo 6 carateres';
    }
    return '';
  }
}
