import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Medication} from "../models/medication.model";
import {MedicationService} from "../services/medication.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-list-view',
  templateUrl: './medication-list-view.component.html',
  styleUrls: ['./medication-list-view.component.css']
})
export class MedicationListViewComponent implements OnInit {

  public medication: Medication[];
  public editMedication: Medication;
  public deleteMedication: Medication;

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.getMedications();
  }

  public getMedications(): void {
    this.medicationService.getMedications().subscribe(
      (response: Medication[]) => {
        this.medication = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddMedication(addForm: NgForm): void {
    document.getElementById('medication-close-button').click();
    this.medicationService.addMedication(addForm.value).subscribe(
      (response: Medication) => {
        this.getMedications();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addForm.reset();
  }

  public onOpenModalMedications(medication: Medication, mode: string): void {
    const container = document.getElementById('main-container-medication')
    const buttonMedication = document.createElement('button');
    buttonMedication.type = 'button';
    buttonMedication.style.display = 'none';
    buttonMedication.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonMedication.setAttribute("data-bs-target", '#addMedicationModal');
    }
    if (mode === 'edit') {
      this.editMedication = medication;
      buttonMedication.setAttribute("data-bs-target", '#editMedicationModal');
    }
    if (mode === 'delete') {
      this.deleteMedication = medication;
      buttonWard.setAttribute("data-bs-target", '#deleteMedicationModal');
    }

    container.appendChild(buttonMedication);
    buttonMedication.click();
  }

  public onUpdateMedication(editForm: NgForm): void {
    document.getElementById('updated-medication-close-button').click();
    this.medicationService.addMedication(editForm.value).subscribe(
      (response: Medication) => {
        this.getMedications();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteMedication(medicationId: string): void {
    document.getElementById('delete-modal-close').click();
    this.medicationService.deleteMedication(medicationId).subscribe(
      (response: void) => {
        this.getMedications();
      },
      (error: HttpErrorResponse) => {

      }
    );
  }
}
