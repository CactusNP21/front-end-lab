import {Component, OnInit} from '@angular/core';
import {DataService} from "../../core/data-service/data.service";
import {Job} from "../../core/models/models";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {
  color = '#9C94F947'
  archive: Job[]
  sub: Subscription
  constructor(private ds: DataService, private router: Router) {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.archive = this.ds.getDashboard(this.ds.lastDashboardId)
          ? this.ds.getDashboard(this.ds.lastDashboardId)!.tasks.archive : []
      }
    })
  }

  ngOnInit(): void {

  }

}
