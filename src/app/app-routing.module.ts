import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AdminListViewComponent} from "./admin-list-view/admin-list-view.component";
import {AdminListViewRolesComponent} from "./admin-list-view-roles/admin-list-view-roles.component";

import {PatientUserInterfaceComponent} from "./patient-user-interface/patient-user-interface.component";
import {AddressUserInterfaceComponent} from "./address-user-interface/address-user-interface.component";

import {WardListViewComponent} from "./ward-list-view/ward-list-view.component";
import {AppointmentComponent} from "./appointment-user-interface/appointment.component";


const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin-list-employees', component: AdminListViewComponent},
  {path: 'admin-list-roles', component: AdminListViewRolesComponent},

  {path: 'patient-user-interface', component: PatientUserInterfaceComponent},
  {path: 'address-user-interface', component: AddressUserInterfaceComponent},

  {path: 'user-list-wards', component: WardListViewComponent},

  {path: 'appointment-user-interface', component: AppointmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, AdminListViewComponent,
  AdminListViewRolesComponent,PatientUserInterfaceComponent, AddressUserInterfaceComponent,AppointmentComponent]

