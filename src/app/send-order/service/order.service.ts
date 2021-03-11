import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/home/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = `${environment.url}/order`;
  constructor(private http: HttpClient) {}

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
}
