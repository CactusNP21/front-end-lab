import {Component, OnInit} from '@angular/core';
import {SortService} from "./services/dashboards-filter/sort.service";
import {NavigationEnd, Router} from "@angular/router";
import {SortTaskService} from "./services/tasks-filter/sort-task.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home: boolean

  constructor(private ss: SortService, private router: Router, private sts: SortTaskService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.home = !this.router.url.includes('/board')
      }

    })
  }

  changeOrder(boolean: boolean) {
    if (this.home) {
      this.ss.sendOrder(boolean)
      return
    }
    this.sts.sendOrder(boolean)
  }

  ngOnInit(): void {
  }

}
