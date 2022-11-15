import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../../../core/data-service/data.service";

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss']
})
export class AddDashboardComponent implements OnInit {
  open = false

  dashboardForm = this.fb.group({
    'title': ['', Validators.required],
    'description': ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private ds: DataService) { }

  sendNewDashboard () {
    const {title, description} = this.dashboardForm.value
    console.log('SENDED')
    this.ds.uploadNewDashboard(title!, description!)
    this.dashboardForm.reset()
  }


  ngOnInit(): void {
  }

}
