import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from "../../../core/models/models";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() jobs: Job[]
  @Input() type: 'todo'|'progress'|'done'
  @Output()  addJob = new EventEmitter<Job>()
  @Output() changes = new EventEmitter<Job>()
  expanded = false

  constructor() { }

  commitChanges(job: Job) {
    this.changes.emit(job)
  }



  add() {
    const task: Job = {
      name: 'Title',
      date: new Date(),
      id: this.jobs.length,
      comments: []
    }
    console.log(task)
    this.addJob.emit(task)
  }
  ngOnInit(): void {
  }

}
