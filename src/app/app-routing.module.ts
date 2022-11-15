import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ErrorComponent} from "./core/error-page/error.component";
import {LoggedGuard} from "./core/guards/logged.guard";
import {AuthenticatedResolver} from "./authentication/authenticated.resolver";


const routes: Routes = [
  {path: 'error', component: ErrorComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    resolve: {bool: AuthenticatedResolver}
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [LoggedGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}
