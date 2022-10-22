import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "../models/patient.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}patient/read-all`)
  }

  public addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiServerUrl}patient/save`, patient)
  }

  public readPatient(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiServerUrl}patient/read/${patientId}`)
  }

  public deletePatient(patientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}patient/delete/${patientId}`)
  }
}
