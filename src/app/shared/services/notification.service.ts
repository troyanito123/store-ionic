import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _url = `${environment.url}/onesignal`;

  constructor(private http: HttpClient) {}

  sendNotificationToUser(
    userId: number,
    orderId: number,
    title: string,
    body: string
  ) {
    return this.http
      .post(`${this._url}/user`, {
        userId,
        orderId,
        title,
        body,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
