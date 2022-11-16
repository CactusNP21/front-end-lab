import {Injectable} from '@angular/core';
import {DataService} from "../../../../core/data-service/data.service";
import {Subject} from "rxjs";
import {Dashboard} from "../../../../core/models/models";


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  newFilter = new Subject<{ field: 'name' | 'task', value: string }>()
  filteredBoards = new Subject<Dashboard[][]>()
  dashboard: Dashboard[][] = []
  deleteBoard = new Subject<string>()
  editBoard = new Subject<Dashboard>()
  field: 'name' | 'task'
  value: string


  constructor(private ds: DataService) {

    const filterFactory = (field: 'name' | 'task', value: string) => {
      if (!value) {
        this.sendFilteredBoards(this.dashboard)
        return
      }
      switch (field) {
        case "name":
          const filteredByName = this.dashboard.map(value1 => {
            return value1.filter(value2 => {
              return value2.title.includes(value)
            })
          })
          console.log(filteredByName)
          this.sendFilteredBoards(filteredByName)
          break;

        case "task":
          const filteredByTaskName = this.dashboard.map(value1 => {
            return value1.filter(value2 => {
              return value2.tasks.todo.filter(task => task.name?.includes(value)).length > 0 ||
                value2.tasks.progress.filter(task => task.name?.includes(value)).length > 0 ||
                value2.tasks.done.filter(task => task.name?.includes(value)).length > 0
            })
          })
          this.sendFilteredBoards(filteredByTaskName)
          break;
      }
    }

    this.deleteBoard.asObservable().subscribe(id => {
      this.dashboard = this.dashboard.map(value => {
        return value.filter(value => !(value._id === id))
      })
      filterFactory(this.field, this.value)
    })
    this.editBoard.asObservable().subscribe()

    this.newFilter.asObservable().subscribe(next => {
      const {value, field} = next
      this.value = value;
      this.field = field;
      filterFactory(field, value)
    })
    this.ds.getTransposedBoards().subscribe(boards => {
      console.log("GET")
      this.dashboard = boards
    })
  }

  getFilteredBoards() {
    return this.filteredBoards.asObservable()
  }

  sendFilteredBoards(dashboards: Dashboard[][]) {
    this.filteredBoards.next(dashboards)
  }

  sendDeleteId(id: string) {
    this.deleteBoard.next(id)
  }

  sendFilterValue(value: string, field: 'name' | 'task') {
    this.newFilter.next({value: value, field: field})
  }

}





