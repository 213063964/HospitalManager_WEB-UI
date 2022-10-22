import { Component, OnInit } from '@angular/core';
import { IShift } from '../models/shift.model';
import { ShiftService } from '../services/shift.service';
import { FormControl, FormGroup } from "@angular/forms";
import { of } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { ToastrUtility } from '../utility/ToastrUtility.utility';

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

  shiftToBeUpdated: IShift =
  {
    shiftId: 0,
    shiftStartTime: "",
    shiftEndTime: "",
    shiftType: "",
    shiftEmployees: new Array<Employee>,
  }

  shifts: Array<IShift> = new Array<IShift>();
  employeesDatabase: Array<Employee> = new Array<Employee>();
  selectedShiftEmployeesList: Array<Employee> = [];
  employeesInList: Array<string> = [];

  constructor(private toastrUtil: ToastrUtility , private shiftService: ShiftService, private employeeService: EmployeeService) 
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
      next: (response) => this.employeesDatabase = response,
      error: (error) => this.toastrUtil.showToastrError(error, "Get request failed"),
      complete: () => this.toastrUtil.showToastrInfo("Request successful", "")
    });
    setTimeout(() => { 
      this.setShiftEmployees();
    }, 3000);
  } 

  saveShift(shift: IShift): void
  {
    this.shiftService.addShift(shift).subscribe(
    {
      error: (error) => this.toastrUtil.showToastrError(error, "Saving Error"),
      complete: () => this.toastrUtil.showToastrInfo("Save Request successful!", "")
    });
  }

  removeShift(shiftId: IShift): void
  {
    this.shiftService.removeShift(shiftId).subscribe(
      {
        error: (error) => this.toastrUtil.showToastrError(error, "Deletion Error")
      });
  }

  setShiftEmployees() : void
  {
    this.shiftsForm.patchValue({
      employees: this.employeesDatabase ?? null
    });
  }

  submitShift()
  {
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
    this.shift.shiftEmployees = this.shiftToBeUpdated.shiftEmployees;
    this.saveShift(this.shift);
    setTimeout(() => { 
      document.location.reload();
    }, 2500);
  }

  deleteShift($event, shift: IShift)
  {
    event.stopPropagation();
    this.removeShift(shift);
    setTimeout(() => { 
      document.location.reload();
    }, 2500);
  }

  pickShiftEmployee(employee: Employee, location: string)
  {
    let selection: any = document.getElementById("selectedShiftEmployeeId");
    if(this.isEmployeeInShiftList(employee))
    {
      window.alert("Cannot add the same employee twice!");
      return;
    }

    if(location === "editModal")
    {
      if(this.isEmployeeInShiftList(employee))
      {
        window.alert("Cannot add the same employee twice!");
        return;
      }
      this.putEmployeeInSchedule(employee, selection);
      return;
    }
    this.employeesInList.push(employee.employeeId);
    this.putEmployeeInSchedule(employee, selection);
  }

  showCreateShiftModal()
  {
    this.fetchEmployees();
    document.getElementById('modalId').style.display = "block";
  }

  showEditShiftModal(shift: IShift)
  {
    this.shiftToBeUpdated = shift;
    this.fetchEmployees();
    document.getElementById('editModalId').style.display = "block";
    this.editShiftsForm.patchValue({
      shiftId: shift.shiftId,
      shiftStartTime: shift.shiftStartTime,
      shiftEndTime: shift.shiftEndTime,
      shiftType: shift.shiftType,
      employees: this.employeesDatabase,
      selectedShiftEmployees: shift.shiftEmployees,
    });
  }

  removeEmployeeFromShift(employee: any)
  {
    document.getElementById("removeEmployeeFromShiftBtnId").setAttribute("class", "btn btn-danger");
    this.shiftToBeUpdated.shiftEmployees.splice(this.shiftToBeUpdated.shiftEmployees.indexOf(employee), 1);
    this.employeesInList.splice(this.shiftToBeUpdated.shiftEmployees.indexOf(employee), 1);
    document.getElementById(`scheduledEmployee${employee.employeeId}`).style.display = "none";
  }

  updateShift(): void
  {
    this.submitUpdatedShift();
  }

  closeCreateShiftModal()
  {
    document.getElementById('modalId').style.display = "none";
  }

  closeEditShiftModal()
  {
    document.getElementById('editModalId').style.display = "none";
    document.getElementById("removeEmployeeFromShiftBtnId").setAttribute("class", "btn btn-secondary");
  }

  private putEmployeeInSchedule(employee: Employee, selection: any)
  {
    this.selectedShiftEmployeesList.push(employee);
    selection.add(new Option(`${employee.name}  ${employee.surname} - ${employee.role.roleName}`, ""));
    this.editShiftsForm.patchValue({
      selectedShiftEmployees: this.selectedShiftEmployeesList ?? null
    });
  }

  private isEmployeeInShiftList(employee: Employee)
  {
    let doesExist = false;
    this.employeesInList.forEach(employeeId => {
      if(employeeId === employee.employeeId) doesExist = true;
    });
    return doesExist;
  }
}
