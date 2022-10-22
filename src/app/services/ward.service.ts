import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ward} from "../models/ward.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WardService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getWards(): Observable<Ward[]> {
    return this.http.get<Ward[]>(`${this.apiServerUrl}ward/find-all`)
  }

  public addWard(ward: Ward): Observable<Ward> {
    return this.http.post<Ward>(`${this.apiServerUrl}ward/save`, ward)
  }

  public readWard(wardId: string): Observable<Ward> {
    return this.http.get<Ward>(`${this.apiServerUrl}ward/read/${wardId}`)
  }

  public deleteWard(wardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}ward/delete/${wardId}`)
  }
}
