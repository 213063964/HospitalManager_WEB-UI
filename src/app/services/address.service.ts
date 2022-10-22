import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../models/address.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}address/read-all`)
  }

  public addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}address/save`, address)
  }

  public readAddress(addressId: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}address/read/${addressId}`)
  }

  public deleteAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}address/delete/${addressId}`)
  }
}
