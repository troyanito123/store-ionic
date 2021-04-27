import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/services/cart.service';
import { environment } from '../../../environments/environment';
import { AuthReponse, User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${environment.url}/auth`;

  private _user;
  private _accessToken;

  actUser$: EventEmitter<User> = new EventEmitter();
  actToken$: EventEmitter<string> = new EventEmitter();

  get user(): User | null {
    return { ...this._user };
  }

  get accesToken(): string | null {
    return this._accessToken;
  }

  constructor(private http: HttpClient, private cartService: CartService) {
    this._user = JSON.parse(localStorage.getItem('user')) || null;
    this._accessToken = localStorage.getItem('access_token') || null;
  }

  login(email: string, password: string) {
    const pushId = localStorage.getItem('pushId');
    return this.http
      .post<AuthReponse>(`${this.url}/login`, { email, password })
      .pipe(
        tap((res) => this.saveUser(res)),
        switchMap(() => this.updatedPushId(pushId)),
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

  updatedPushId(pushId: string) {
    return this.http.post(`${environment.url}/user/push`, { pushId });
  }

  saveUser(res: AuthReponse) {
    this._user = res.data;
    this._accessToken = `Bearer ${res.access_token}`;
    localStorage.setItem('user', JSON.stringify(this._user));
    localStorage.setItem('access_token', `Bearer ${res.access_token}`);
    this.actUser$.emit(this._user);
    this.actToken$.emit(this._accessToken);
  }

  deleteUser() {
    this._user = null;
    this._accessToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    this.cartService.deleteCart();
  }

  isAdmin() {
    if (!this._user) {
      return false;
    }
    return this._user.role === 'ADMIN';
  }

  get isAuthenticate() {
    return this._user !== null;
  }
}
