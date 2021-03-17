import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewImage, Product } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _url = `${environment.url}/product`;

  private _product: Product;

  product$: EventEmitter<Product> = new EventEmitter();

  constructor(private http: HttpClient) {}

  get product() {
    return { ...this._product };
  }

  getProducts() {
    return this.http.get<Product[]>(this._url).pipe(catchError(() => of([])));
  }

  getProductForAdmin() {
    return this.http
      .get<Product[]>(`${this._url}/admin/all`)
      .pipe(catchError(() => of([])));
  }

  getOneProduct(productId: number): Observable<Product | null> {
    return this.http.get<Product>(`${this._url}/${productId}`).pipe(
      tap((res) => this.changeProduct(res)),
      catchError(() => of(null))
    );
  }

  createProduct(
    name: string,
    code: string,
    description: string,
    price: number,
    unit: number,
    images: any[]
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('unitId', unit.toString());

    for (const image of images) {
      formData.append('images', image, `file-${Date.now().toPrecision}.jpeg`);
    }

    return this.http.post(this._url, formData).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  updatedProduct(
    id: number,
    name: string,
    code: string,
    description: string,
    price: number,
    unit: number,
    images: any[]
  ): Observable<Product | null> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('status', 'ACTIVE');
    formData.append('unitId', unit.toString());

    for (const image of images) {
      formData.append('images', image, `file-${Date.now().toPrecision}.jpeg`);
    }
    return this.http.put<Product>(`${this._url}/${id}`, formData).pipe(
      switchMap((product) => this.getOneProduct(product.id)),
      catchError(() => of(null))
    );
  }

  private changeProduct(product: Product) {
    this._product = product;
    this.product$.emit(this._product);
  }
}
