import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { EmailValidatorService } from 'src/app/shared/services/email-validator.service';
import { PushService } from 'src/app/shared/services/push.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, ViewWillEnter {
  registerForm: FormGroup;
  emailPattern: string;
  isLoading = false;

  pushId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailValidatorService: EmailValidatorService,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private pushSerice: PushService
  ) {
    this.emailPattern = this.validatorService.emailPattern;
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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.registerForm.value;
    this.isLoading = true;
    this.authService
      .register(name, email, password)
      .subscribe(async (success) => {
        this.isLoading = false;
        if (success) {
          if (this.pushId) {
            this.authService.updatedPushId(this.pushId).subscribe();
          }
          this.registerForm.reset();
          this.router.navigate(['tabs']);
        } else {
          const alert = await this.utilsService.createAlert(
            'Ocurrio un error!',
            'Vuelve a intentar por favor!'
          );
          this.registerForm.get('password').setValue('');
          this.registerForm.get('password2').setValue('');
          alert.present();
        }
      });
  }

  private createForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
          [this.emailValidatorService],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
      },
      {
        validators: [this.validatorService.sameFields('password', 'password2')],
      }
    );
  }

  invalidField(field: string) {
    return (
      this.registerForm.get(field).invalid &&
      this.registerForm.get(field).touched
    );
  }

  get invalidNameMsg(): string {
    const errors = this.registerForm.get('name').errors;
    if (errors?.required) {
      return 'Nombre es obligatorio';
    } else if (errors?.minlength) {
      return 'Nombre debe tener minimo 2 carateres';
    }
    return '';
  }

  get invalidEmailMsg(): string {
    const errors = this.registerForm.get('email').errors;
    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.email) {
      return 'Email debe ser valido';
    } else if (errors?.emailTaken) {
      return 'Email ya esta tomado';
    }
    return '';
  }

  get invalidPasswordMsg(): string {
    const errors = this.registerForm.get('password').errors;
    if (errors?.required) {
      return 'Contraseña obligatoria';
    } else if (errors?.minlength) {
      return 'Contraseña debe tener minimo 6 carateres';
    }
    return '';
  }

  get invalidPassword2Msg(): string {
    const errors = this.registerForm.get('password2').errors;
    if (errors?.required) {
      return 'Contraseña obligatoria';
    } else if (errors?.noSame) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
