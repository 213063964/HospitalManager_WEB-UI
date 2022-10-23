import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Prescription} from "../models/prescription.model";
import {PrescriptionService} from "../services/prescription.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-list-view',
  templateUrl: './prescription-list-view.component.html',
  styleUrls: ['./prescription-list-view.component.css']
})
export class PrescriptionListViewComponent implements OnInit {

  public prescription: Prescription[];
  public editPrescription: Prescription;
  public deletePrescription: Prescription;

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  public getPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe(
      (response: Prescription[]) => {
        this.prescription = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddPrescription(addForm: NgForm): void {
    document.getElementById('prescription-close-button').click();
    this.prescriptionService.addPrescription(addForm.value).subscribe(
      (response: Prescription) => {
        this.getPrescriptions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addForm.reset();
  }

  public onOpenModalPrescriptions(prescription: Prescription, mode: string): void {
    const container = document.getElementById('main-container-prescription')
    const buttonPrescription = document.createElement('button');
    buttonPrescription.type = 'button';
    buttonPrescription.style.display = 'none';
    buttonPrescription.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonPrescription.setAttribute("data-bs-target", '#addPrescriptionModal');
    }
    if (mode === 'edit') {
      this.editPrescription = prescription;
      buttonPrescription.setAttribute("data-bs-target", '#editPrescriptionModal');
    }
    if (mode === 'delete') {
      this.deletePrescription = prescription;
      buttonPrescription.setAttribute("data-bs-target", '#deletePrescriptionModal');
    }

    container.appendChild(buttonPrescription);
    buttonPrescription.click();
  }

  public onUpdatePrescription(editForm: NgForm): void {
    document.getElementById('updated-prescription-close-button').click();
    this.prescriptionService.addPrescription(editForm.value).subscribe(
      (response: Prescription) => {
        this.getPrescriptions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeletePrescription(prescriptionId: string): void {
    document.getElementById('delete-modal-close').click();
    this.prescriptionService.deletePrescription(prescriptionId).subscribe(
      (response: void) => {
        this.getPrescriptions();
      },
      (error: HttpErrorResponse) => {

      }
    );
  }
}
