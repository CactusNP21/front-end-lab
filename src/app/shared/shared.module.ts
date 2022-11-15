import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideNavBarComponent } from './aside-nav-bar/aside-nav-bar.component';

import { HeaderComponent } from './header/header.component';
import { UsernamePipe } from './header/pipe/username.pipe';
import {FilterComponent} from './header/filter-component/filter.component';
import { SortComponent } from './header/sort-component/sort.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AsideNavBarComponent,
    HeaderComponent,
    UsernamePipe,
    SortComponent,
    FilterComponent
  ],
    exports: [
        AsideNavBarComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
