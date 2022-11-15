import {Injectable} from '@angular/core';
import {DataService} from "../../../../core/data-service/data.service";
import {Subject, take} from "rxjs";
import {Dashboard} from "../../../../core/models/models";
import {SortService} from "./sort.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  subject = new Subject<{ field: 'name' | 'task', value: string, deleteId?: string }>()
  filteredBoards = new Subject<Dashboard[][]>()
  dashboard: Dashboard[][] = []
  deleteBoard = new Subject<string>()

  constructor(private ds: DataService) {

    const filterFactory = (field: 'name' | 'task', value: string, deleteId?: string) => {
      if (deleteId) {
        this.dashboard = this.dashboard.map(value => {
          return value.filter(value => !(value._id === deleteId))
        })
      }
      if (!value) {
        this.sendFilteredBoard(this.dashboard)
        return
      }
      switch (field) {

        case "name":
          const filteredByName = this.dashboard.map(value1 => {
            return value1.filter(value2 => {
              return value2.title.includes(value)
            })
          })
          this.sendFilteredBoard(filteredByName)
          break;

        case "task":
          const filteredByTaskName = this.dashboard.map(value1 => {
            return value1.filter(value2 => {
              return value2.tasks.todo.filter(task => task.name?.includes(value)).length > 0 ||
              value2.tasks.progress.filter(task => task.name?.includes(value)).length > 0 ||
              value2.tasks.done.filter(task => task.name?.includes(value)).length > 0
            })
          })
          this.sendFilteredBoard(filteredByTaskName)
          break;
      }
    }

    this.subject.asObservable().subscribe(next => {
      const {value, field, deleteId} = next
      filterFactory(field, value, deleteId)
    })
    this.deleteBoard.asObservable().subscribe(next => {

    })
    this.ds.getTransposedBoards().subscribe(boards => {
      console.log("Filter works")
      this.dashboard = boards
    })
  }
  getFilteredBoards () {
    return this.filteredBoards.asObservable()
  }
  sendFilteredBoard(dashboards: Dashboard[][]) {
    this.filteredBoards.next(dashboards)
  }

  sendFilterValue(value: string, field: 'name' | 'task', deleteId?: string) {
    this.subject.next({value: value, field: field, deleteId: deleteId})
  }

}





