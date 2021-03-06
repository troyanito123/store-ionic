import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log(email, password);
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    } else if (errors?.email) {
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
