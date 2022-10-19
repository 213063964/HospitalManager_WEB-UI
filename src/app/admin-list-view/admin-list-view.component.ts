import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../services/employee.service";
import {Role} from "../models/role.model";
import {RoleService} from "../services/role.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.css']
})
export class AdminListViewComponent implements OnInit {

  public employees: Employee[];
  public roles: Role[];
  public selectedRole: string = 'Select Role';
  public deleteEmployee: Employee;
  public editEmployee: Employee;

  constructor(private employeeService: EmployeeService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getRoles()
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddEmployee(addEmployeeForm: NgForm): void {
    document.getElementById('employee-close-button').click();
    this.employeeService.addEmployee(addEmployeeForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addEmployeeForm.reset();
  }


  public onOpenModalEmployees(employee: Employee, mode: string): void {
    const container2 = document.getElementById('main-container-employee')
    const buttonEmployee = document.createElement('button');
    buttonEmployee.type = 'button';
    buttonEmployee.style.display = 'none';
    buttonEmployee.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonEmployee.setAttribute("data-bs-target", '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      buttonEmployee.setAttribute("data-bs-target", '#editEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      buttonEmployee.setAttribute("data-bs-target", '#deleteEmployeeModal');
    }

    container2.appendChild(buttonEmployee);
    buttonEmployee.click();
  }


  public onDeleteEmployee(employeeId: string): void {
    document.getElementById('delete-employee-modal-close').click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  public onUpdateEmployee(editEmployeeForm: NgForm): void {
    document.getElementById('updated-employee-close-button').click();
    this.employeeService.addEmployee(editEmployeeForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
