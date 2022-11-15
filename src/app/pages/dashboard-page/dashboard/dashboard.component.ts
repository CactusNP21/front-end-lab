import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DataService} from "../../../core/data-service/data.service";
import {SortService} from "../../../shared/header/services/dashboards-filter/sort.service";
import {FilterService} from "../../../shared/header/services/dashboards-filter/filter.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Dashboard} from "../../../core/models/models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [trigger('over', [
    state('up', style(
      {transform: 'none'}
    )),
    state('down', style(
      {margin: '5vw 0 0 0'}
    )),
    transition('up<=>down', [
      animate('0.3s  ease-in')
    ])]),
    trigger('show', [
        state('hide', style(
          {opacity: 0}
        )),
        state('show', style(
          {opacity: 1}
        )),
        transition('hide <=> show', [
          animate('0.2s ease-in')
        ])
      ]
    )]
})

export class DashboardComponent implements OnInit {
  @ViewChild('titleP') titleP: ElementRef

  @Input()dashboard : Dashboard

  id: string

  over = false
  down = false
  disabled = true

  constructor(private ds: DataService, private fs: FilterService, private ss: SortService) {
  }

  start() {
    this.over = !this.over
    setTimeout(() => {
      this.down = !this.down
    }, 0)
  }

  end() {
    this.down = !this.down
    setTimeout(() => {
      this.over = !this.over
    }, 0)
  }

  log() {
    console.log(this.titleP.nativeElement.innerText)
  }

  editEnable() {
    console.log('2')
    this.disabled = false
    setTimeout(() => {
      this.titleP.nativeElement.focus()
    }, 0)
  }

  edit() {
    this.ds.updateDashboard(this.id, this.titleP.nativeElement.value).subscribe(
      value => {
        if (!(value instanceof HttpErrorResponse)) {
          this.ds.updateDashboards(this.dashboard)
        }
      }
    )
  }

  delete() {
    this.ds.deleteDashboard(this.id).subscribe(response => {
      if (!(response instanceof HttpErrorResponse)) {
        this.fs.sendFilterValue('', 'name', this.id)
      }
    })
  }

  ngOnInit(): void {
    this.id = this.dashboard._id
  }

}
