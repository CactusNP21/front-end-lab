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
    return of(false)

  }
}
