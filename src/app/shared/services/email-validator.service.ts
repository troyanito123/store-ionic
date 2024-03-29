import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService {
  url = `${environment.url}/validation/email`;

  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http
      .post<boolean>(this.url, { email })
      .pipe(
        map((resp) => (resp ? { emailTaken: true } : null)),
        catchError((err) => of({ emailTaken: true }))
      );
  }
}
