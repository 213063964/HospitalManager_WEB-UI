import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoginComponent } from './login/login.component';
import { AdminListViewComponent } from './admin-list-view/admin-list-view.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminListViewRolesComponent } from './admin-list-view-roles/admin-list-view-roles.component';
import { ShiftsManagementComponent } from './shifts-management/shifts-management.component';
import { PatientUserInterfaceComponent } from "./patient-user-interface/patient-user-interface.component";
import { AddressUserInterfaceComponent } from "./address-user-interface/address-user-interface.component";
import { WardListViewComponent } from './ward-list-view/ward-list-view.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule} from "ngx-toastr";
import {AppointmentComponent} from "./appointment-user-interface/appointment.component";

@NgModule({
  declarations: [
    AppComponent,
    ShiftsManagementComponent,
    routingComponents,
    AdminNavComponent,
    LoginComponent,
    AdminListViewComponent,
    AdminListViewRolesComponent,
    AppointmentComponent,
    PatientUserInterfaceComponent,
    AddressUserInterfaceComponent,
    WardListViewComponent,
    UserNavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      timeOut: 3000
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
