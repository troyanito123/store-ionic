import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/home/interfaces/interface';
import { Order, OrderFull } from 'src/app/orders/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = `${environment.url}/order`;
  private user: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.user;
  }

  sendOrder(
    products: Product[],
    address: string,
    location: string,
    cost: number
  ) {
    const payload = {
      total: cost.toString(),
      address,
      location,
      detailsJson: JSON.stringify(
        products.map((p) => ({ productId: p.id, cant: p.cant }))
      ),
    };

    return this.http.post(this.url, payload).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getOrders() {
    if (this.user.role === 'ADMIN') {
      return this.http.get<Order[]>(this.url).pipe(catchError(() => of([])));
    }
    return this.http
      .get<Order[]>(`${this.url}/user`)
      .pipe(catchError(() => of([])));
  }

  getOrder(orderId: number): Observable<OrderFull | null> {
    return this.http
      .get<OrderFull>(`${this.url}/${orderId}`)
      .pipe(catchError(() => of(null)));
  }

  changeDelivered(
    orderId: number,
    delivered: boolean
  ): Observable<Order | null> {
    return this.http
      .post<Order>(`${this.url}/delivered`, { orderId, delivered })
      .pipe(catchError(() => of(null)));
  }
}
