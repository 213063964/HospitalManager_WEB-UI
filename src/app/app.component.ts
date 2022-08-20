import {Component, OnInit} from '@angular/core';
import {Employee} from "./models/employee.model";
import {EmployeeService} from "./services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HospitalManager_WEB-UI';


  constructor() { }

  ngOnInit() {

  }


}
