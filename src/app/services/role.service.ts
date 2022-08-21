import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/role.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}role/read-all`)
  }

  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerUrl}role/save`, role)
  }

  public readRole(roleId: string): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}role/read/${roleId}`)
  }

  public deleteRole(roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}role/delete/${roleId}`)
  }
}
