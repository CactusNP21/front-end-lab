import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilterService} from "../services/dashboards-filter/filter.service";
import {NavigationEnd, Router} from "@angular/router";
import {FilterTasksService} from "../services/tasks-filter/filter-tasks.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @ViewChild('search') searchInput: ElementRef
  @ViewChild('field') selectField: ElementRef

  home: boolean

  constructor(private filterService: FilterService,
              private fts: FilterTasksService,
              private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.home = !this.router.url.includes('/board')
      }

    })
  }

  delayTimer: NodeJS.Timeout;

  filter() {
    clearTimeout(this.delayTimer)
    this.delayTimer = setTimeout(() => {
      if (this.home) {
        this.filterService.sendFilterValue(this.searchInput.nativeElement.value, this.selectField.nativeElement.value)
      }else {
        this.fts.sendValue(this.searchInput.nativeElement.value)
      }

    }, 500)

  }

  ngOnInit(): void {

  }

}
