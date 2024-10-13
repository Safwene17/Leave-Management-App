import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../models/employee';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl; // Use the API URL from the environment

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<employee[]>(`${this.apiUrl}/employees/getallemployees`);
  }

  getEmployee(id: number) {
    return this.http.get<employee>(`${this.apiUrl}/employees/getemployeebyid/` + id);
  }

  postEmployee(employeeObj: any) {
    return this.http.post<employee>(`${this.apiUrl}/employees/addemployee`, employeeObj);
  }

  deleteEmployee(id: any) {
    return this.http.delete<employee>(`${this.apiUrl}/employees/deleteemployee/` + id);
  }

  updateEmployee(id: number, employeeObj: employee) {
    return this.http.put<employee>(`${this.apiUrl}/employees/updateemployee/` + id, employeeObj);
  }

  updateProfile(id: number, employeeObj: employee) {
    return this.http.put<employee>(`${this.apiUrl}/employees/updateprofile/` + id, employeeObj);
  }
}
