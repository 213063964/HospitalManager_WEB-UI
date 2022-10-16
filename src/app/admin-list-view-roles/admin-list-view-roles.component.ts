import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../models/role.model";
import {RoleService} from "../services/role.service";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-list-view-roles',
  templateUrl: './admin-list-view-roles.component.html',
  styleUrls: ['./admin-list-view-roles.component.css']
})
export class AdminListViewRolesComponent implements OnInit {

  public roles: Role[];
  public editRole: Role;
  public deleteRole: Role;

  constructor(private roleService: RoleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        this.showToastrError("Unable to retrieve roles", "Roles not retrieved")
      }
    )
  }

  public onAddRole(addForm: NgForm): void {
    document.getElementById('role-close-button').click();
    this.roleService.addRole(addForm.value).subscribe(
      (response: Role) => {
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        this.showToastrError("Error while adding record. Ensure that all information is correct", "Save Unsuccessful")
      }
  );
    addForm.reset();
  }

  public onOpenModalRoles(role: Role, mode: string): void {
    const container = document.getElementById('main-container-role')
    const buttonRole = document.createElement('button');
    buttonRole.type = 'button';
    buttonRole.style.display = 'none';
    buttonRole.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonRole.setAttribute("data-bs-target", '#addRoleModal');
    }
    if (mode === 'edit') {
      this.editRole = role;
      buttonRole.setAttribute("data-bs-target", '#editRoleModal');
    }
    if (mode === 'delete') {
      this.deleteRole = role;
      buttonRole.setAttribute("data-bs-target", '#deleteRoleModal');
    }

    container.appendChild(buttonRole);
    buttonRole.click();
  }

  public onUpdateRole(editForm: NgForm): void {
    document.getElementById('updated-role-close-button').click();
    this.roleService.addRole(editForm.value).subscribe(
      (response: Role) => {
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        this.showToastrError("Error while updating record. Make sure information is valid", "Update Failed")
      }
    );
  }

  public onDeleteRole(roleId: string): void {
    document.getElementById('delete-modal-close').click();
    this.roleService.deleteRole(roleId).subscribe(
      (response: void) => {
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        this.showToastr("Cannot delete as Employee is associated to this role", "Record Associated");
      }
    );
  }

  showToastr(message: string, title: string){
    this.toastr.warning(message, title);
  }

  showToastrError(message: string, title: string){
    this.toastr.error(message, title);
  }
}
