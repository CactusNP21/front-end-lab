import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DragNDropService {


  target = new Subject<any>()
  taskId = new Subject<any>()
  source = new Subject<any>()
  test = new Subject<any>()
  sub = new Subject<any>()

  constructor() {
  }

  getSource () {
    return this.source.asObservable()
  }
  sendSource (source: string) {
    return this.source.next(source)
  }

  getTarget() {
    return this.target.asObservable()
  }
  sendTarget(target: string) {
    this.target.next(target)
  }

  getTaskId() {
    return this.taskId.asObservable()
  }
  sendTaskId(id: number) {
    this.taskId.next(id)
  }
}
