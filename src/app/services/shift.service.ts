import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IShift } from "../models/shift.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ShiftService
{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient)
    {   }

    addShift(shift: any) : Observable<IShift>
    {
        console.log("Attempting to save a new shift.");
        console.log(shift);
        return this.http.post<IShift>(`${this.apiServerUrl}shift/save`, shift);
    }

    getShift(shiftId: number) : Observable<IShift>
    {
        return this.http.get<IShift>(`${this.apiServerUrl}shift/read?shiftId=${shiftId}`);
    }

    getShifts() : any
    {
        return this.http.get<IShift[]>(`${this.apiServerUrl}shift/find-all`);
    }

    removeShift(shift: IShift) : any
    {
        return this.http.post<IShift>(`${this.apiServerUrl}shift/delete`, shift);
    }
}

