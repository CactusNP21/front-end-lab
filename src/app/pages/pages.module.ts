import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {SharedModule} from "../shared/shared.module";
import { AddDashboardComponent } from './dashboard-page/add-dashboard/add-dashboard.component';
import { DashboardComponent } from './dashboard-page/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BoardPageComponent } from './board-page/board-page.component';
import { ColumnComponent } from './board-page/column/column.component';
import { StopPropDirective } from './dashboard-page/derictive/stop-prop.directive';
import { DropDirective } from './board-page/drag-n-drop/directives/drop.directive';
import { DragDirective } from './board-page/drag-n-drop/directives/drag.directive';
import { TaskComponent } from './board-page/task/task.component';
import { ArchivePageComponent } from './archive-page/archive-page.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardPageComponent,
    AddDashboardComponent,
    DashboardComponent,
    BoardPageComponent,
    ColumnComponent,
    StopPropDirective,
    DropDirective,
    DragDirective,
    TaskComponent,
    ArchivePageComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PagesModule { }
