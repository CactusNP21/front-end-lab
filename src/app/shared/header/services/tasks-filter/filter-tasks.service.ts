import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Dashboard} from "../../../../core/models/models";

@Injectable({
  providedIn: 'root'
})
export class FilterTasksService {

  dashboard$ = new Subject<Dashboard>()
  filteredDash$ = new Subject<Dashboard>()
  value$ = new Subject<string>()
  dashboard: Dashboard

  constructor() {
    this.dashboard$.asObservable().subscribe(
      dashboard => {
        this.dashboard = dashboard
      }
    )
    this.value$.asObservable().subscribe(value => {
      console.log(!value)
      if (!value) {
        console.log(this.dashboard.tasks)
        this.sendFilteredDash(this.dashboard)
        return
      }
      const copiedDashboard: Dashboard = JSON.parse(JSON.stringify(this.dashboard))
      const {todo, progress, done} = copiedDashboard.tasks
      copiedDashboard.tasks.todo = todo.filter(task => task.name?.includes(value))
      copiedDashboard.tasks.progress = progress.filter(task => task.name?.includes(value))
      copiedDashboard.tasks.done = done.filter(task => task.name?.includes(value))
      this.sendFilteredDash(copiedDashboard)
      return;
    })


  }
  sendDashboard(dashboard: Dashboard) {
    this.dashboard$.next(dashboard)
  }

  getFilteredDash () {
    return this.filteredDash$.asObservable()
  }

  sendValue(value: string) {
    this.value$.next(value)
  }

  sendFilteredDash (dashboard: Dashboard) {
    this.filteredDash$.next(dashboard)
  }
}
