import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthReponse, User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${environment.url}/auth/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthReponse>(this.url, { email, password })
      .pipe(
        tap((res) => this.saveUser(res)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  saveUser(res: AuthReponse) {
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.setItem('access_token', `Bearer ${res.access_token}`);
  }
}
