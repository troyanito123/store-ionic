import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductService } from '../../settings/pages/products/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductValidatorService   {
  private _url = `${environment.url}/validation/product`;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const code: string = control.value;
    const product = this.productService.product;
    if (product.code) {
      if (product.code === code.toLocaleUpperCase()) {
        return of(null);
      }
    }
    return this.http
      .post<boolean>(this._url, { code: code.toLocaleUpperCase() })
      .pipe(
        map((resp) => (resp ? { codetaken: true } : null)),
        catchError((err) => of({ codetaken: true }))
      );
  }
}
