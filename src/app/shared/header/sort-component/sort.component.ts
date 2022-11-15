import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SortService} from "../services/dashboards-filter/sort.service";
import {NavigationEnd, Router} from "@angular/router";
import {SortTaskService} from "../services/tasks-filter/sort-task.service";

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @ViewChild('sortField') sortField: ElementRef
  home: boolean

  constructor(private ss: SortService, private router: Router, private sts: SortTaskService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.home = !this.router.url.includes('/board')
      }

    })
  }

  sort() {
    if (this.home) {
      this.ss.sendSortField(this.sortField.nativeElement.value)
    }
    this.sts.sendSortValue(this.sortField.nativeElement.value)
  }

  ngOnInit(): void {
  }

}
