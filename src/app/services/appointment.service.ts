import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Appointment } from "../models/appointment.model";
import { environment } from "src/environments/environment";




@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }


  public getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServiceUrl}appointment/read-all`)
  }

  public addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiServiceUrl}appointment/save`, appointment)
  }

  public readAppointment(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiServiceUrl}appointment/read/${appointmentId}`)
  }

  public deleteAppointment(appointmentId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiServiceUrl}appointment/delete/${appointmentId}`)
  }

}
