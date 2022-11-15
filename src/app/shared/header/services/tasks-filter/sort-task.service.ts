import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Dashboard} from "../../../../core/models/models";
import {FilterTasksService} from "./filter-tasks.service";

@Injectable({
  providedIn: 'root'
})
export class SortTaskService {

  order$ = new Subject<boolean>()
  order = false
  sortValue$ = new Subject<'name' | 'date'>()
  dash$ = new Subject<Dashboard>()
  sortedDash$ = new Subject<Dashboard>()
  sort: 'name' | 'date' = 'date'

  dashboard: Dashboard


  updateIndex(dash: Dashboard) {
    dash.tasks.todo.forEach((value, index) => {
      value.id = index
    })
    dash.tasks.progress.forEach((value, index) => {
      value.id = index
    })
    dash.tasks.done.forEach((value, index) => {
      value.id = index
    })
  }

  reverseDash(dash: Dashboard) {
    dash.tasks.todo = dash.tasks.todo.reverse()
    dash.tasks.progress = dash.tasks.progress.reverse()
    dash.tasks.done = dash.tasks.done.reverse()
  }

  sortFactory(sort: 'name' | 'date', dash: Dashboard) {
    const {todo, progress, done} = dash.tasks
    switch (sort) {
      case 'date': {
        dash.tasks.todo = todo.sort((a, b) => (new Date(a['date']) > new Date(b['date'])) ? -1 : 1);
        dash.tasks.progress = progress.sort((a, b) => (new Date(a['date']) > new Date(b['date'])) ? -1 : 1);
        dash.tasks.done = done.sort((a, b) => (new Date(a['date']) > new Date(b['date'])) ? -1 : 1);
        if (this.order) {
          this.reverseDash(dash)
        }
        this.updateIndex(dash)
        this.sortedDash$.next(dash)
        break
      }
      case "name": {
        dash.tasks.todo = todo.sort((a, b) => (a['name']! > b['name']!) ? 1 : -1);
        dash.tasks.progress = progress.sort((a, b) => (a['name']! > b['name']!) ? 1 : -1);
        dash.tasks.done = done.sort((a, b) => (a['name']! > b['name']!) ? 1 : -1);
        if (this.order) {
          this.reverseDash(dash)
        }
        this.updateIndex(dash)
        this.sortedDash$.next(dash)
        break
      }
    }
  }

  constructor(private fts: FilterTasksService) {
    this.dash$.asObservable().subscribe(dash => {
      this.dashboard = dash
      this.sortFactory(this.sort, this.dashboard)
    })
    this.order$.asObservable().subscribe(order => {
      this.order = order
      this.sortFactory(this.sort, this.dashboard)
    })
    this.fts.getFilteredDash().subscribe(dash => {
      this.dashboard = dash
      this.sortFactory(this.sort, this.dashboard)
    })
  }

  getSortedDash() {
    return this.sortedDash$.asObservable()
  }

  sendDash(dash: Dashboard) {
    this.dash$.next(dash)
  }

  sendSortValue(sort: 'name' | 'date') {
    this.sortValue$.next(sort)
  }

  sendOrder(order: boolean) {
    this.order$.next(order)
  }
}
