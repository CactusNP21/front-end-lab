import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = 'https://angular-back-3ij74jxm6-cactusnp21.vercel.app'

  constructor(private http: HttpClient) {
  }

  checkUsername(username: string): Observable<any> {
    return this.http.post(this.url + '/user/check/', {
      username: username
    }).pipe(catchError(err => {
      return of(new HttpErrorResponse({status: err.status}))
    }))
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.url + '/auth/login', {
        username: username,
        password: password
      }
    ).pipe(catchError(err => {
      console.log(err)
      return of(new HttpErrorResponse({status: err.status}))
    }))
  }

  register(username: string, password: string): Observable<any> {

    return this.http.post(this.url + '/user/register', {
        username: username,
        password: password
      }
    ).pipe(catchError(err => {
      return of(new HttpErrorResponse({status: err.status}))
    }))
  }
}
