import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {DataService} from "../data-service/data.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private ds: DataService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((sessionStorage.getItem('token')! || localStorage.getItem('token'))) {
      try {
        const {
          username,
          sub
        } = JSON.parse(window.atob(((sessionStorage.getItem('token')! || localStorage.getItem('token'))!)
          .split('.')[1]));
        if (username && sub) {
          this.ds.setUsername(username)
          this.ds.setUserId(sub)
          return true
        }
      } catch {
        sessionStorage.clear()
        localStorage.removeItem('token')
        return false
      }
    }
    return false
  }
}
