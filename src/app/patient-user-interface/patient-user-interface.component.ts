import { Component, OnInit } from '@angular/core';
import {Patient} from "../models/patient.model";
import {HttpErrorResponse} from "@angular/common/http";
import {PatientService} from "../services/patient.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-patient-user-interface',
  templateUrl: './patient-user-interface.component.html',
  styleUrls: ['./patient-user-interface.component.css']
})
export class PatientUserInterfaceComponent implements OnInit {

  public patients: Patient[];
  public deletePatient: Patient;
  public editPatient: Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response: Patient[]) => {
        this.patients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddPatient(addPatientForm: NgForm): void {
    document.getElementById('patient-close-button').click();
    this.patientService.addPatient(addPatientForm.value).subscribe(
      (response: Patient) => {
        this.getPatients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addPatientForm.reset();
  }


  public onOpenModalPatients(patient: Patient, mode: string): void {
    const container2 = document.getElementById('main-container-patient')
    const buttonPatient = document.createElement('button');
    buttonPatient.type = 'button';
    buttonPatient.style.display = 'none';
    buttonPatient.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonPatient.setAttribute("data-bs-target", '#addPatientModal');
    }
    if (mode === 'edit') {
      this.editPatient = patient;
      buttonPatient.setAttribute("data-bs-target", '#editPatientModal');
    }
    if (mode === 'delete') {
      this.deletePatient = patient;
      buttonPatient.setAttribute("data-bs-target", '#deletePatientModal');
    }

    container2.appendChild(buttonPatient);
    buttonPatient.click();
  }


  public onDeletePatient(patientId: string): void {
    document.getElementById('delete-patient-modal-close').click();
    this.patientService.deletePatient(patientId).subscribe(
      (response: void) => {
        this.getPatients();
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  public onUpdatePatient(editPatientForm: NgForm): void {
    // document.getElementById('updated-role-close-button').click();
    // this.roleService.addRole(editEmployeeForm.value).subscribe(
    //   (response: Role) => {
    //     this.getRoles();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message)
    //   }
    // );
  }

}
