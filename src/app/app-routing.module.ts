import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AdminListViewComponent} from "./admin-list-view/admin-list-view.component";
import {AdminListViewRolesComponent} from "./admin-list-view-roles/admin-list-view-roles.component";
import {UserListViewComponent} from "./user-list-view/user-list-view.component";

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin-list-employees', component: AdminListViewComponent},
  {path: 'admin-list-roles', component: AdminListViewRolesComponent},
  {path: 'user-list-wards', component: UserListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, AdminListViewComponent, AdminListViewRolesComponent, UserListViewComponent]
