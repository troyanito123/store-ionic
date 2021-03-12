import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private url = `${environment.url}/messages`;

  constructor(private http: HttpClient) {}

  sendMessage(body: string, orderId: number): Observable<Message | null> {
    return this.http
      .post<Message>(this.url, { body, orderId })
      .pipe(catchError(() => of(null)));
  }
}
