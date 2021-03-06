import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [AuthPage, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthPageModule {}
