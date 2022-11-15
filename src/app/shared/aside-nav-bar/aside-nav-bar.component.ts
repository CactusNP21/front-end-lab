import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../core/data-service/data.service";

@Component({
  selector: 'app-aside-nav-bar',
  templateUrl: './aside-nav-bar.component.html',
  styleUrls: ['./aside-nav-bar.component.scss']
})
export class AsideNavBarComponent implements OnInit, OnDestroy {
  lastId: string
  sub: Subscription
  sub1: Subscription
  url: string

  constructor(private router: Router, private ds: DataService) {
    this.sub1 = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url
      }
    })
  }

  logOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.router.navigate(['auth'])
  }


  ngOnInit(): void {
    this.sub = this.ds.getLastDashboardId().subscribe(id => {
      this.lastId = id
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
    this.sub1.unsubscribe()
  }

}
