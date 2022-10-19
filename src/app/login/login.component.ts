import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employeeId: string;
  public password: string;
  public routerLinkLogin: string;
  public loginEmployee: Employee;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  public onReadEmployee(employeeId: string): void {
    this.employeeService.readEmployee(employeeId).subscribe(
      (response: Employee) => {
        this.loginEmployee = response;
        this.validateEmployeeAdmin(this.loginEmployee);
      },
      (error: HttpErrorResponse) => {
        this.showToastr();
      }
    )
  }

  public validateEmployeeAdmin(employeeV: Employee): void{
      if (employeeV.role.roleName === 'Admin' && employeeV.employeeId === this.employeeId && employeeV.password === this.password) {
        this.routerLinkLogin = "/admin-list-employees";
        document.getElementById("admin-login").click();
      }else{
        this.routerLinkLogin = "/login";
        this.showToastr();
      }

  }

  showToastr(){
    this.toastr.error("Username or password invalid", "Invalid Login");
  }
}
