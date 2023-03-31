import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';

const defaultHeaders = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
});
const defaultParams: HttpParams = new HttpParams();

@Injectable({
  providedIn: 'root',
})
export class ApiAccessService {
  private readonly _http: HttpClient;

  public constructor(http: HttpClient) {
    this._http = http;
  }

  get(path: string, options: any = { headers: defaultHeaders, params: defaultParams }): Observable<any> {
    //console.log(defaultHeaders)
    return this._http.get(`${BASE_URL}${path}`, options).pipe(
      switchMap(response => {
        if (Object(response).hasOwnProperty('error')) {
          throw Error('Services Error');
        }
        return of(response);
      })
    );
  }

  post(path: string, body: Object = {}, options: any = { headers: defaultHeaders }): Observable<any> {
    return this._http.post(`${BASE_URL}${path}`, JSON.stringify(body), options).pipe(
      switchMap(response => {
        if (Object(response).hasOwnProperty('error')) {
          throw Error('Services Error');
        }
        return of(response);
      })
    );
  }

  put(path: string, body: Object = {}, options: any = { headers: defaultHeaders }): Observable<any> {
    return this._http.put(`${BASE_URL}${path}`, JSON.stringify(body), options).pipe(
      switchMap(response => {
        if (Object(response).hasOwnProperty('error')) {
          throw Error('Services Error');
        }
        return of(response);
      })
    );
  }

  delete(path: string, options: any = { headers: defaultHeaders, params: defaultParams }): Observable<any> {
    return this._http.delete(`${BASE_URL}${path}`, options).pipe(
      switchMap(response => {
        if (Object(response).hasOwnProperty('error')) {
          throw Error('Services Error');
        }
        return of(response);
      })
    );
  }
}
