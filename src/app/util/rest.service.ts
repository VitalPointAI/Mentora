import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
      private http: HttpClient
  ) { }

  static readonly endpoint = 'http://localhost:4200';
  static readonly httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  private extractData(res: Response) {
      let body = res;
      return body || {};
  }

  getProfile(id): Observable<any> {
      return this.http.get(RestService.endpoint + 'profile/' + id).pipe(
          map(this.extractData));
  }
}

