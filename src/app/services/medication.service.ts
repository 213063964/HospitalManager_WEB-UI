import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Medication} from "../models/medication.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMedications(): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.apiServerUrl}medication/read-all`)
  }

  public addMedication(medication: Medication): Observable<Medication> {
    return this.http.post<Medication>(`${this.apiServerUrl}medication/save`, medication)
  }

  public readMedication(medicationId: string): Observable<Medication> {
    return this.http.get<Medication>(`${this.apiServerUrl}medication/read/${medicationId}`)
  }

  public deleteMedication(medicationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}medication/delete/${medicationId}`)
  }
}
