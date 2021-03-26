import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailPattern: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.emailPattern = validatorService.emailPattern;
    this.createForm();
  }

  ngOnInit() {}

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
      email: [
        'admin@test.com',
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['123123', [Validators.required, Validators.minLength(6)]],
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
