import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductValidatorService {
  private _url = `${environment.url}/validation/product`;

  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const code: string = control.value;
    return this.http
      .post<boolean>(this._url, { code: code.toLocaleUpperCase() })
      .pipe(
        map((resp) => (resp ? { codetaken: true } : null)),
        catchError((err) => of({ codetaken: true }))
      );
  }
}
