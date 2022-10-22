import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";

import { LoginComponent } from './login/login.component';
import { AdminListViewComponent } from './admin-list-view/admin-list-view.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminListViewRolesComponent } from './admin-list-view-roles/admin-list-view-roles.component';

import { ShiftsManagementComponent } from './shifts-management/shifts-management.component';


@NgModule({
  declarations: [
    AppComponent,
    ShiftsManagementComponent,
    routingComponents,
    AdminNavComponent,
    LoginComponent,
    AdminListViewComponent,
    AdminListViewRolesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
