import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthReponse } from '../auth/interfaces/interface';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate, CanLoad {
  url = `${environment.url}/auth/renew`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => this.authService.saveUser(res)),
      map(() => true),
      catchError(() => {
        if (this.authService.isAuthenticate) {
          this.authService.deleteUser();
        }
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
  canLoad(): Observable<boolean> | boolean {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => this.authService.saveUser(res)),
      map(() => true),
      catchError(() => {
        if (this.authService.isAuthenticate) {
          this.authService.deleteUser();
        }
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
