import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {Dashboard, Tasks} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://nest-epam.herokuapp.com'


  username: string
  userId: string
  lastDashboardId: string
  boards: Dashboard[]

  newDash = new Subject<Dashboard>()
  transposed = new Subject<Dashboard[][]>()
  lastDashboardId$ = new Subject<string>()


  constructor(private http: HttpClient
  ) {
  }

  clearData() {
    this.boards = []
  }

  updateDashboards(dashboard: Dashboard) {
    this.boards[this.boards.findIndex(value => value._id === dashboard._id)] = dashboard
  }


  setUsername(username: string) {
    this.username = username
  }

  getLastDashboardId() {
    return this.lastDashboardId$.asObservable()
  }

  sendLastDashboardId(id: string) {
    this.lastDashboardId = id
    this.lastDashboardId$.next(id)
  }

  getUsername() {
    return this.username
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  getNewBoard() {
    return this.newDash.asObservable()
  }

  getTransposedBoards() {
    return this.transposed.asObservable()
  }

  sendTransposedBoards(dashboards: Dashboard[][]) {
    this.transposed.next(dashboards)
  }

  getDashboard(id: string) {
    return this.boards.find(value => value._id === id)
  }


  private createDashboard(title: string, description: string, id: string): Dashboard {
    const dash: Dashboard = {
      _id: id,
      title: title,
      description: description,
      date: new Date(),
      tasks: {todo: [], done: [], progress: [], archive: []}
    }
    this.boards.push(dash)
    return dash
  }

  updateDashboard(id: string, title?: string, tasks?: Tasks) {
    return this.http.patch(this.url + '/dashboards/update', {
      id: id,
      title: title,
      tasks: tasks
    }).pipe(catchError(err => {
      return of(new HttpErrorResponse({status: err.status}))
    }))
  }

  deleteDashboard(id: string) {
    return this.http.delete(this.url + '/dashboards', {
      body: {
        id: id
      }
    }).pipe(map(value => {
        if (id === this.lastDashboardId) {
          this.sendLastDashboardId('')
        }
        this.boards = this.boards.filter(value1 => value1._id !== id)
        return value
      }),
      catchError(err => {
        return of(new HttpErrorResponse({status: err.status}))
      }))
  }

  loadDashboards(): Observable<any> {
    return this.http.get<Dashboard[]>(this.url + '/dashboards').pipe(
      map(response => {
          console.log(response)
          this.boards = response
          return response
        }
      )
    )
  }

  uploadNewDashboard(title: string, description: string) {
    this.http.put<{ status: number, _id: any }>(this.url + '/dashboards/create', {
      title: title,
      description: description
    }).pipe(
      catchError(async (err) => new HttpErrorResponse({status: err.status}))
    ).subscribe(response => {
      if (!(response instanceof HttpErrorResponse)) {
        this.newDash.next(this.createDashboard(title, description, response._id))
      }

    })
  }


}
