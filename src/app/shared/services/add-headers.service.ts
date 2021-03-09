import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddHeadersService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      console.log('no nay access token');
      return next.handle(req);
    }
    const headers = new HttpHeaders({ Authorization: access_token });
    const reqClone = req.clone({ headers });
    return next.handle(reqClone);
  }
}
