import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/responseApi.interface';
import { Employee } from '../model/employee.model';
import { EarnedLeave } from '../model/leaveType.interface';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/'

  loggedUserData: any;
  constructor(private http: HttpClient) {
    const localdata = localStorage.getItem('laveUser');
    if (localdata) {
      this.loggedUserData = JSON.parse(localdata);
    }
  }
  getDepartment(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetParentDepartment')
  }
  getChildDepartmentByParentId(id: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetChildDepartmentByParentId?deptId =' + id)
  }
  createNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + 'CreateEmployee', employee)
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'GetAllEmployees')
  }
  deleteEmployee(id: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.apiUrl + '/DeleteEmployee/' + id)
  }
  getAllChildDepartment(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllChildDepartment')
  }
  UpdateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl + 'UpdateEmployee/' + employee.employeeId, employee)
  }
  AddEarnedLeave(earned: EarnedLeave): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.apiUrl + 'AddNewEarnedLeave', earned)
  }
  GetAllEarnedLeaves(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllEarnedLeaves')
  }
  GetLeaveType():Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + 'GetLeaveTypes')
  }
}
