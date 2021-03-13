import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _url = `${environment.url}/product`;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this._url).pipe(catchError(() => of([])));
  }

  getProductForAdmin() {
    return this.http
      .get<Product[]>(`${this._url}/admin/all`)
      .pipe(catchError(() => of([])));
  }

  getOneProduct(productId: number): Observable<Product | null> {
    return this.http
      .get<Product>(`${this._url}/${productId}`)
      .pipe(catchError(() => of(null)));
  }
}
