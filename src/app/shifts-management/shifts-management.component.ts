import { Component, OnInit } from '@angular/core';
import { IShift } from '../models/shift.model';
import { ShiftService } from '../services/shift.service';
import { FormControl, FormGroup } from "@angular/forms";
import { of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-shifts-management',
  templateUrl: './shifts-management.component.html',
  styleUrls: ['./shifts-management.component.css']
})
export class ShiftsManagementComponent implements OnInit {

  shiftsForm = new FormGroup({
    shiftId: new FormControl(0),
    shiftStartTime: new FormControl(""),
    shiftEndTime: new FormControl(""),
    shiftType: new FormControl(""),
    employees: new FormControl(new Array<Employee>), 
    selectedShiftEmployees: new FormControl(new Array<Employee>),
  });

  editShiftsForm = new FormGroup({
    shiftId: new FormControl(0),
    shiftStartTime: new FormControl(""),
    shiftEndTime: new FormControl(""),
    shiftType: new FormControl(""),
    employees: new FormControl(new Array<Employee>), 
    selectedShiftEmployees: new FormControl(new Array<Employee>),
  });

  shift: IShift =
  {
    shiftId: 0,
    shiftStartTime: "",
    shiftEndTime: "",
    shiftType: "",
    shiftEmployees: new Array<Employee>,
  }

  shifts: Array<IShift> = new Array<IShift>();
  employees: Array<Employee> = new Array<Employee>();

  selectedShiftEmployeesList: Array<Employee> = [];

  constructor(private shiftService: ShiftService, private employeeService: EmployeeService) 
  { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchShifts();
  }

  fetchShifts() : void
  {
    this.shiftService.getShifts().subscribe(
    {
      next: (response) => this.shifts = response,
      error: (error) => console.error(error),
      complete: () => console.info("Get Shifts Request successful!")
    });
    setTimeout(() => { 
      
    }, 3000);
  }

  fetchEmployees(): void
  {
    this.employeeService.getEmployees().subscribe(
    {
      next: (response) => this.shift.shiftEmployees = response,
      error: (error) => console.error(error),
      complete: () => console.info("Get Employees Request successful!")
    });
    setTimeout(() => { 
      this.setShiftEmployees();
    }, 3000);
  } 

  saveShift(shift: IShift): void
  {
    this.shiftService.addShift(shift).subscribe(
    {
      next: (response) => console.log(response),
      error: (error) => console.error(error),
      complete: () => console.info("Save Request successful!")
    });
  }

  removeShift(shiftId: IShift): void
  {
    this.shiftService.removeShift(shiftId).subscribe(
      {
        next: (response) => console.log(response),
        error: (error) => console.error(error),
        complete: () => console.info("Delete Request successful!")
      });
  }

  setShiftEmployees() : void
  {
    this.shiftsForm.patchValue({
      employees: this.shift.shiftEmployees ?? null
    });
    this.employees = this.shift.shiftEmployees;
  }

  submitShift()
  {
    //this.shift.shiftId = this.shifts.length + 1;
    this.shift.shiftStartTime = this.shiftsForm.value.shiftStartTime;
    this.shift.shiftEndTime = this.shiftsForm.value.shiftEndTime;
    this.shift.shiftType = this.shiftsForm.value.shiftType;
    this.shift.shiftEmployees = this.selectedShiftEmployeesList;
    this.saveShift(this.shift);
    setTimeout(() => { 
      document.location.reload();
    }, 2500);
  }

  submitUpdatedShift()
  {
    this.shift.shiftId = this.editShiftsForm.value.shiftId;
    this.shift.shiftStartTime = this.editShiftsForm.value.shiftStartTime;
    this.shift.shiftEndTime = this.editShiftsForm.value.shiftEndTime;
    this.shift.shiftType = this.editShiftsForm.value.shiftType;
    this.shift.shiftEmployees = this.selectedShiftEmployeesList;
    this.saveShift(this.shift);
    setTimeout(() => { 
      document.location.reload();
    }, 2500);
  }

  deleteShift(shift: IShift)
  {
    this.removeShift(shift);
    setTimeout(() => { 
      document.location.reload();
    }, 2500);
  }

  pickShiftEmployee(employee: Employee, location: string)
  {
    if(location.match("editModal"))
    {
      this.selectedShiftEmployeesList.push(employee);
      this.editShiftsForm.patchValue({
        selectedShiftEmployees: this.selectedShiftEmployeesList ?? null
      });
    }
    this.selectedShiftEmployeesList.push(employee);
    this.shiftsForm.patchValue({
      selectedShiftEmployees: this.selectedShiftEmployeesList ?? null
    });
    
  }

  showCreateShiftModal()
  {
    document.getElementById('modalId').style.display = "block";
  }

  showEditShiftModal(shift: IShift)
  {
    document.getElementById('editModalId').style.display = "block";
    console.log(this.employees);
    this.editShiftsForm.patchValue({
      shiftId: shift.shiftId,
      shiftStartTime: shift.shiftStartTime,
      shiftEndTime: shift.shiftEndTime,
      shiftType: shift.shiftType,
      employees: this.employees, 
      selectedShiftEmployees: shift.shiftEmployees,
    });
  }

  closeCreateShiftModal()
  {
    document.getElementById('modalId').style.display = "none";
  }

  closeEditShiftModal()
  {
    document.getElementById('editModalId').style.display = "none";
  }
}
