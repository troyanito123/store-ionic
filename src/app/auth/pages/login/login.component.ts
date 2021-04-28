import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { PushService } from 'src/app/shared/services/push.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, ViewWillEnter {
  loginForm: FormGroup;
  emailPattern: string;
  isLoading = false;
  pushId: string;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private pushSerice: PushService
  ) {
    this.emailPattern = validatorService.emailPattern;
    this.createForm();
  }
  async ionViewWillEnter() {
    const info = await this.pushSerice.getPushId();
    this.pushId = info.userId;
  }

  async ngOnInit() {
    const info = await this.pushSerice.getPushId();
    this.pushId = info.userId;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(async (success) => {
      this.isLoading = false;
      if (success) {
        if (this.pushId) {
          this.authService.updatedPushId(this.pushId).subscribe();
        }
        this.loginForm.reset();
        this.router.navigate(['tabs']);
      } else {
        const alert = await this.utilsService.createAlert(
          'Error de acceso',
          'Comprueba tus credenciales por favor'
        );
        this.loginForm.get('password').setValue('');
        alert.present();
      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  invalidField(field: string) {
    return (
      this.loginForm.get(field).invalid && this.loginForm.get(field).touched
    );
  }

  get invalidEmailMsg(): string {
    const errors = this.loginForm.get('email').errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.pattern) {
      return 'Email debe ser valido';
    }
    return '';
  }

  get invalidPasswordMsg(): string {
    const errors = this.loginForm.get('password').errors;
    if (errors?.required) {
      return 'Contraseña obligatoria';
    } else if (errors?.minlength) {
      return 'Contraseña debe tener minimo 6 carateres';
    }
    return '';
  }
}
