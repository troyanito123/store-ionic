import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Unit } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private _url = `${environment.url}/unit`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Unit[]>(this._url).pipe(catchError(() => of([])));
  }
}
