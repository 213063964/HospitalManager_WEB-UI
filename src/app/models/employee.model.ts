import {Role} from "./role.model";

export interface Employee {
  employeeId: string
  role: Role
  name: string
  surname: string
  password: string
}
