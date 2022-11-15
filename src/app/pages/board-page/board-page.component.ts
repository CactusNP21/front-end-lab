import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dashboard, Job, Tasks} from "../../core/models/models";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../core/data-service/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DragNDropService} from "./drag-n-drop/service/drag-n-drop.service";
import {Subscription} from "rxjs";
import {FilterTasksService} from "../../shared/header/services/tasks-filter/filter-tasks.service";
import {SortTaskService} from "../../shared/header/services/tasks-filter/sort-task.service";
import {
  logExperimentalWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";
import {postcss} from "@angular-devkit/build-angular/src/webpack/plugins/postcss-cli-resources";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit, OnDestroy {

  id: string
  dashboard: Dashboard
  copiedDashboard: Dashboard

  sub: Subscription
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private ds: DataService,
              private activatedRoute: ActivatedRoute,
              private dnd: DragNDropService,
              private fts: FilterTasksService,
              private sts: SortTaskService,
              private router: Router) {
    let target: 'todo' | 'progress' | 'done'
    let source: 'todo' | 'progress' | 'done'
    let taskId: number
    let copiedTasks: Tasks
    this.sub = this.dnd.getTarget().subscribe(value => target = value)
    this.sub1 = this.dnd.getSource().subscribe(newSource => source = newSource)
    this.sub2 = this.dnd.getTaskId().subscribe(newId => {

      if (source === target) {
        return
      }
      taskId = newId
      copiedTasks = this.copiedDashboard.tasks
      copiedTasks[source][taskId].id = copiedTasks[target].length
      copiedTasks[target].push(copiedTasks[source][taskId])
      copiedTasks[source].splice(taskId, 1)
      copiedTasks[source].slice(taskId).forEach((value) => {
        value.id = value.id! - 1
      })
      this.copiedDashboard.tasks = copiedTasks
      this.dashboardFactory('update')
    })


  }

  delete() {
      this.ds.deleteDashboard(this.id).subscribe(response => {
        if (!(response instanceof HttpErrorResponse)) {
            this.router.navigate(['app/dashboards'])
            this.ds.sendLastDashboardId('')
        }
      })
  }

  dashboardFactory(actions: 'add' | 'update', type?: 'todo' | 'progress' | 'done', project?: Job) {
    switch (actions) {
      case "add": {
        this.copiedDashboard.tasks[type!].push(project!)
        this.ds.updateDashboard(this.id, undefined, this.copiedDashboard.tasks).subscribe(
          response => {
            if (!(response instanceof HttpErrorResponse)) {
              this.dashboard = this.copiedDashboard
              this.fts.sendDashboard(this.dashboard)
              this.sts.sendDash(this.dashboard)
              this.ds.updateDashboards(this.dashboard)
            }
          })
        break
      }
      case "update": {
        if (type && project && project.name) { //update
          console.log("UPDATE")
          console.log(project.id)
          this.copiedDashboard.tasks[type][project.id] = project!
        }
        if (!project?.name && type) { //delete
          this.copiedDashboard.tasks[type].splice(project?.id!, 1);
          this.copiedDashboard.tasks[type].slice(project?.id!).forEach((value) => {
            value.id = value.id! - 1
          })
        }
        if (project?.archived && type)  {
          this.copiedDashboard.tasks.archive.push(project)
          this.copiedDashboard.tasks[type].splice(project?.id!, 1);
          this.copiedDashboard.tasks[type].slice(project?.id!).forEach((value) => {
            value.id = value.id! - 1
          })
        }
        this.ds.updateDashboard(this.id, undefined, this.copiedDashboard.tasks).subscribe(
          response => {
            if (!(response instanceof HttpErrorResponse)) {
              this.dashboard = this.copiedDashboard
              this.fts.sendDashboard(this.dashboard)
              this.sts.sendDash(this.dashboard)
              this.ds.updateDashboards(this.dashboard)
            }
          })
      }

    }
  }

  updateDashboard(type: 'todo' | 'progress' | 'done', project: Job) {
    this.dashboard.tasks[type].push(project)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      this.id = param['id']
      this.ds.sendLastDashboardId(this.id)
      this.dashboard = this.ds.getDashboard(this.id)!
      this.fts.sendDashboard(this.dashboard)
      this.sts.sendDash(this.dashboard)
    })
    this.copiedDashboard = JSON.parse(JSON.stringify(this.dashboard))
    this.sub3 = this.fts.getFilteredDash().subscribe(dash => {
      this.dashboard = dash
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()

  }
}
