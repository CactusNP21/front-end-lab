import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('token')! || localStorage.getItem('token')!) {
      const bearerReq = request.clone({
        headers: request.headers.set('Authorization',
          'Bearer ' + (sessionStorage.getItem('token')! || localStorage.getItem('token'))!)
      })
      console.log(bearerReq)
      return next.handle(bearerReq)
    }

    return next.handle(request);
  }
}
