import { Employee } from "./employee.model";

export interface IShift
{
    shiftId: number;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftType: string;
    shiftEmployees: Array<Employee>;
}