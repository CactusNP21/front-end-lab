import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationComponent} from './component/authentication.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthFormComponent } from './component/auth-form/auth-form.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule {
}
