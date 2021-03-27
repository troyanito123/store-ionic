import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthReponse } from '../auth/interfaces/interface';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  url = `${environment.url}/auth/renew`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  canLoad(): boolean | Observable<boolean> {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => this.authService.saveUser(res)),
      map((res) => {
        if (res.data.role !== 'ADMIN') {
          this.router.navigate(['/tabs/home']).then(async () => {
            const toast = await this.toastController.create({
              message: 'No tienes los privilegios para ingresar a esa ruta!',
              duration: 2500,
            });
            toast.present();
          });
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.authService.deleteUser();
        this.router.navigate(['/auth']).then(async () => {
          const toast = await this.toastController.create({
            message: 'Por favor ingrese sus credenciales para continuar.',
            duration: 2500,
          });

          toast.present();
        });
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> | boolean {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => this.authService.saveUser(res)),
      map((res) => {
        if (res.data.role !== 'ADMIN') {
          this.router.navigate(['/tabs/home']).then(async () => {
            const toast = await this.toastController.create({
              message: 'No tienes los privilegios para ingresar a esa ruta!',
              duration: 2500,
            });
            toast.present();
          });
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.authService.deleteUser();
        this.router.navigate(['/auth']).then(async () => {
          const toast = await this.toastController.create({
            message: 'Por favor ingrese sus credenciales para continuar.',
            duration: 2500,
          });

          toast.present();
        });
        return of(false);
      })
    );
  }
}
