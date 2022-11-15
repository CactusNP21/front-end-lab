import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Job} from "../../../core/models/models";
import {animate, query, sequence, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @ViewChild('title') title: ElementRef
  @ViewChild('comment') commentInput: ElementRef
  @Input() job: Job
  @Input() type: string

  @Output() changes = new EventEmitter<Job>()


  expanded = false
  start = false
  disabled = true

  constructor() {
  }

  archive() {
    let copiedJob: Job = JSON.parse(JSON.stringify(this.job))
    copiedJob.archived = true
    this.commitChange(copiedJob)
  }

  deleteComment(id: number) {
    let copiedJob: Job = JSON.parse(JSON.stringify(this.job))
    copiedJob.comments.splice(id, 1)
    this.commitChange(copiedJob)
  }

  edit() {
    this.disabled = false
    setTimeout(() => {
      this.title.nativeElement.focus()
    })
  }

  editTitle(newTitle: string) {
    let copiedJob: Job = JSON.parse(JSON.stringify(this.job))
    console.log(this.job.id)
    console.log(copiedJob.id)
    copiedJob.name = newTitle
    this.commitChange(copiedJob)
  }

  commitChange(newJob: Job) {
    this.changes.emit(newJob)
  }


  delete() {
    let copiedJob: Job = JSON.parse(JSON.stringify(this.job))
    copiedJob.name = undefined
    this.commitChange(copiedJob)
  }

  addComment(comment: string) {
    let copiedJob: Job = JSON.parse(JSON.stringify(this.job))
    this.commentInput.nativeElement.value = ''
    copiedJob.comments.push(comment)
    console.log(copiedJob)
    this.commitChange(copiedJob)
  }


  ngOnInit(): void {
  }

}
