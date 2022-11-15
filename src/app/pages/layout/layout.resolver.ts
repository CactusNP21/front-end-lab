import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DataService} from "../../core/data-service/data.service";
import {Dashboard} from "../../core/models/models";

@Injectable({
  providedIn: 'root'
})
export class LayoutResolver implements Resolve<Observable<Dashboard[]>> {

  constructor(private ds: DataService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dashboard[]>{
    console.log('resolver')
    if (this.ds.boards) {
      return of(this.ds.boards)
    }
    return this.ds.loadDashboards()
  }
}
