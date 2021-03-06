import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.registerForm.value;
    console.log(email, password);
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(2)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    });
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
    }
    return '';
  }
}
