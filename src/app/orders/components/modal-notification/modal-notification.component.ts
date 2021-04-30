import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss'],
})
export class ModalNotificationComponent implements OnInit {
  @Input() userId: number;
  @Input() orderId: string;

  notificationForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  sendNotification() {
    if (this.notificationForm.invalid) {
      this.notificationForm.markAllAsTouched();
      return;
    }
    console.log(this.notificationForm.value);
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
