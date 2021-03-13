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
  url = `${environment.url}/auth`;

  private _user;
  private _accessToken;

  get user(): User | null {
    return { ...this._user };
  }

  get accesToken(): string | null {
    return this._accessToken;
  }

  constructor(private http: HttpClient) {
    this._user = localStorage.getItem('user') || null;
    this._accessToken = localStorage.getItem('access_token') || null;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthReponse>(`${this.url}/login`, { email, password })
      .pipe(
        tap((res) => this.saveUser(res)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<AuthReponse>(`${this.url}/register`, { name, email, password })
      .pipe(
        tap((res) => this.saveUser(res)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  saveUser(res: AuthReponse) {
    this._user = res.data;
    this._accessToken = `Bearer ${res.access_token}`;
    localStorage.setItem('user', JSON.stringify(this._user));
    localStorage.setItem('access_token', `Bearer ${res.access_token}`);
  }

  deleteUser() {
    this._user = null;
    this._accessToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }

  isAdmin() {
    return this._user.role === 'ADMIN';
  }
}
