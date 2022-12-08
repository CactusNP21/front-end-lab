import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedResolver implements Resolve<boolean> {
  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if ((sessionStorage.getItem('token')! || localStorage.getItem('token'))) {
      try {
        const {
          username,
          sub
        } = JSON.parse(window.atob(((sessionStorage.getItem('token')! || localStorage.getItem('token'))!)
          .split('.')[1]));
        if (username && sub) {
          this.router.navigate(['app/dashboards'])
          return of(true)
        }
      }
      catch {
        sessionStorage.clear()
        localStorage.removeItem('token')
        return of(false)
      }
    }
    return of(false)
}}
