import {Injectable} from '@angular/core';
import {DataService} from "../../../../core/data-service/data.service";
import {Subject} from "rxjs";
import {Dashboard} from "../../../../core/models/models";
import {FilterService} from "./filter.service";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  dashboards: Dashboard[][] = []
  sortField = new Subject<string>()
  sortedDashboards = new Subject<Dashboard[][]>()
  order$ = new Subject<boolean>()
  sort = 'title';
  order = false;

  constructor(private ds: DataService, private fs: FilterService) {

    const sortFactory = (sort: string, dashboards: Dashboard[][]) => {
      const flat = dashboards.flat()
      switch (sort) {
        case 'title': {
          let sorted = flat.sort((a, b) => (a['title'] < b['title']) ? -1 : 1);
          if (this.order) {
            sorted = sorted.reverse()
          }
          this.sortedDashboards.next(this.transpose(sorted))
          break
        }
        case 'date': {
          let sorted = flat.sort((a, b) => (new Date(a[sort]) > new Date(b[sort])) ? -1 : 1);
          if (this.order) {
            sorted = sorted.reverse()
          }
          this.sortedDashboards.next(this.transpose(sorted))
          break
        }
        case 'tt': {
          let sorted = flat.sort((a, b) => (a["tasks"]["todo"].length > b["tasks"]["todo"].length) ? -1 : 1)
          if (this.order) {
            sorted = sorted.reverse()
          }
          this.sortedDashboards.next(this.transpose(sorted))
          break
        }
        case 'pt': {
          let sorted = flat.sort((a, b) => (a["tasks"]["progress"].length > b["tasks"]["progress"].length) ? -1 : 1)
          if (this.order) {
            sorted = sorted.reverse()
          }
          this.sortedDashboards.next(this.transpose(sorted))
          break
        }
        case 'dt': {
          let sorted = flat.sort((a, b) => (a["tasks"]["done"].length > b["tasks"]["done"].length) ? -1 : 1)
          if (this.order) {
            sorted = sorted.reverse()
          }
          this.sortedDashboards.next(this.transpose(sorted))
          break
        }
      }
    }


    this.fs.getFilteredBoards().subscribe(dashboard => {
      sortFactory(this.sort, dashboard)
    })

    this.getSortField().subscribe(sort => {
      this.sort = sort
      sortFactory(sort, this.dashboards)
    })

    this.ds.getTransposedBoards().subscribe(dashboards => {
      this.dashboards = dashboards
    })

    this.order$.asObservable().subscribe(order => {
      this.order = order
      sortFactory(this.sort, this.dashboards)
    })

  }

  getSortedDashboards() {
    return this.sortedDashboards.asObservable()
  }

  sendSortField(sortField: string) {
    this.sortField.next(sortField)
  }

  getSortField() {
    return this.sortField.asObservable()
  }

  sendOrder(order: boolean) {
    this.order$.next(order)
  }

  transpose(dashboards: any) {
    dashboards = dashboards.filter((value: any) => value)
    let chunk: any = []
    let transposed: Dashboard[][]
    const leftToTranspose = 4 - dashboards.length % 4
    if (leftToTranspose) {
      for (let i = 0; i < leftToTranspose; i++) {
        dashboards.push(false)
      }
    }
    const chunkSize = 4
    for (let i = 0; i < dashboards.length; i += chunkSize) {
      const chunkUnit = dashboards.slice(i, i + chunkSize);
      chunk.push(chunkUnit)
    }
    // @ts-ignore
    transposed = chunk[0].map((_, colIndex) => chunk.map(row => row[colIndex]));
    transposed = transposed.map(value => {
      return value.filter(value => !!value)
    })
    return transposed
  }
}
