import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'app-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.css']
})
export class AdminListViewComponent implements OnInit {

  public employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
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
}
