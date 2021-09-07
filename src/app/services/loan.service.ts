import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Calculator } from '../Calculator';
import { Observable, pipe, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-API-KEY': 'swb-222222',
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  apiUrl = "/api"
  public onError: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

  calculateLoan(loan: Calculator) {
    console.log(loan)
    return this.http.post(this.apiUrl, loan, httpOptions)
      .pipe(
        map((response) => response),
        catchError(error => {
          this.onError.next(error.message);
          return throwError(error);
        })
      );
  }
}
