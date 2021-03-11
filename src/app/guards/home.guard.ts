import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
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
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => {}),
      map(() => true),
      catchError(() => {
        this.authService.deleteUser();
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.http.get<AuthReponse>(this.url).pipe(
      tap((res) => this.authService.saveUser(res)),
      map(() => true),
      catchError(() => {
        this.authService.deleteUser();
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
