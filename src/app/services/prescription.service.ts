import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prescription} from "../models/prescription.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiServerUrl}prescription/read-all`)
  }

  public addPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.apiServerUrl}prescription/save`, prescription)
  }

  public readPrescription(prescriptionId: string): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiServerUrl}prescription/read/${prescriptionId}`)
  }

  public deletePrescription(prescriptionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}prescription/delete/${prescriptionId}`)
  }
}
