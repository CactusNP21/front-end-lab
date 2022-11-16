import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dashboard} from "../../core/models/models";
import {DataService} from "../../core/data-service/data.service";
import {ActivatedRoute} from "@angular/router";
import {SortService} from "../../shared/header/services/dashboards-filter/sort.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  transposed: Dashboard[][]
  getB: Subscription
  getTB: Subscription

  constructor(private ds: DataService, private activatedRoute: ActivatedRoute, private ss: SortService) {
    this.getB = this.ds.getNewBoard().subscribe(
      value => {
        console.log(this.transposed.flat().length)
        const leftToTranspose = this.transposed.flat().length % 4
        this.transposed[leftToTranspose].push(value)
        this.ds.sendTransposedBoards(this.transposed)
      }
    )

  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({dashboards}) => {
        console.log('ACTIVATED ROUTE')
      console.log(dashboards)
        this.transposed = this.ss.transpose(dashboards);
        this.ds.sendTransposedBoards(this.transposed)
      }
    )
    this.getTB = this.ss.getSortedDashboards().subscribe(value => {
      console.log(value)
      this.transposed = value
    })
  }

  ngOnDestroy(): void {
    this.getB.unsubscribe()
    this.getTB.unsubscribe()
  }

}
