import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Appointment} from "../models/appointment.model";
import {AppointmentService} from "../services/appointment.service";

@Component({
  selector: 'app-appointment-user-interface',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public appointments: Appointment[];
  public deleteAppointment: Appointment;
  public editAppointment: Appointment;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  public getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddAppointment(addAppointmentForm: NgForm): void {
    document.getElementById('appointment-close-button').click();
    this.appointmentService.addAppointment(addAppointmentForm.value).subscribe(
      (response: Appointment) => {
        this.getAppointments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    addAppointmentForm.reset();
  }


  public onOpenModalAppointments(appointment: Appointment, mode: string): void {
    const container2 = document.getElementById('main-container-appointment')
    const buttonAppointment = document.createElement('button');
    buttonAppointment.type = 'button';
    buttonAppointment.style.display = 'none';
    buttonAppointment.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      buttonAppointment.setAttribute("data-bs-target", '#addAppointmentModal');
    }
    if (mode === 'edit') {
      this.editAppointment = appointment;
      buttonAppointment.setAttribute("data-bs-target", '#editAppointmentModal');
    }
    if (mode === 'delete') {
      this.deleteAppointment = appointment;
      buttonAppointment.setAttribute("data-bs-target", '#deleteAppointmentModal');
    }

    container2.appendChild(buttonAppointment);
    buttonAppointment.click();
  }

  public onDeleteAppointment(appointmentId: string): void {
    document.getElementById('delete-appointment-modal-close').click();
    // @ts-ignore
    this.appointmentService.deleteAppointment(appointmentId).subscribe
    ( ()=>{
        this.getAppointments();
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  public onUpdateAppointment(editAppointmentForm: NgForm): void {
    document.getElementById('updated-appointment-close-button').click();
    this.appointmentService.addAppointment(editAppointmentForm.value).subscribe(
      (response: Appointment) => {
        this.getAppointments();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }
}
