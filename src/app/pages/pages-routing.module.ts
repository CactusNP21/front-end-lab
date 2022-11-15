import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {LayoutResolver} from "./layout/layout.resolver";
import {BoardPageComponent} from "./board-page/board-page.component";
import {ArchivePageComponent} from "./archive-page/archive-page.component";
import {OpenedBoardGuard} from "../core/guards/opened-board.guard";

const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    {
      path: 'dashboards', component: DashboardPageComponent, pathMatch: 'full', resolve: {dashboards: LayoutResolver}
    },
    {
      path: 'dashboards/board', pathMatch: 'full', component: BoardPageComponent, resolve: {dashboards: LayoutResolver}

    },
    {
      path: 'dashboards/board/archive',
      pathMatch: 'full',
      component: ArchivePageComponent,

      canActivate: [OpenedBoardGuard]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
